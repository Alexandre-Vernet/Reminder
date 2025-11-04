import { HttpException, HttpStatus, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, In, Repository } from "typeorm";
import { NotificationEntity } from "./notification.entity";
import { CronService } from "../cron/cron.service";
import { NotificationDto, UserDto } from "../interfaces";

@Injectable()
export class NotificationService implements OnModuleInit {

	constructor(
		@InjectRepository(NotificationEntity)
		private notificationRepository: Repository<NotificationEntity>,
		private readonly cronService: CronService
	) {
	}

	// Re-create cron after server restart
	onModuleInit() {
		this.notificationRepository.find().then(notifications => {
			notifications.map(notification => {
				if (notification.status) {
					this.cronService.addCron(notification);
				}
			});
		});
	}

	async createNotification(notification: NotificationDto, user: UserDto) {
		// Check if name is already used
		const existingNotification = await this.notificationRepository.find({
			where: {
				user: {
					id: user.id
				},
				name: notification.name
			}
		});
		if (existingNotification.length) {
			throw new HttpException({
				message: 'Notification with this name already exists',
				code: 'NAME_EXISTS'
			}, HttpStatus.CONFLICT);
		}

		notification.status = true;
		notification.user = user;
		const createdNotification = await this.notificationRepository.save(notification);
		this.cronService.addCron(createdNotification);

		return notification;
	}

	async createMultipleNotification(notification: NotificationDto[], user: UserDto) {
		// Check if name is already used
		const existingNotification = await this.notificationRepository.find({
			where: {
				user: {
					id: user.id
				},
				name: In(notification.map(n => n.name))
			}
		});
		if (existingNotification.length) {
			throw new HttpException({
				message: 'Notification with this name already exists',
				code: 'NAME_EXISTS'
			}, HttpStatus.CONFLICT);
		}


		notification.map(async (notification) => {
			notification.status = true;
			notification.user = user;
		});
		const createdNotification = await this.notificationRepository.save(notification);
		createdNotification.map(notification => this.cronService.addCron(notification));

		return this.findAllByUserId(user.id);
	}

	findAllByUserId(userId: number) {
		const options: FindManyOptions = {
			where: {
				user: {
					id: userId
				}
			}
		}
		return this.notificationRepository.find(options);
	}

	async update(notificationId: number, notification: NotificationDto) {
		this.cronService.addCron(notification);
		notification.updatedAt = new Date();
		await this.notificationRepository.update(notificationId, notification);
		return notification;
	}

	delete(notificationId: number) {
		this.cronService.checkJobExistsAndDelete(notificationId);
		return this.notificationRepository.delete(notificationId);
	}
}
