import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, Repository } from "typeorm";
import { NotificationEntity } from "./notification.entity";
import { NotificationDto, UserDto } from "../../../../libs/interfaces";
import { CronService } from "../cron/cron.service";

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
		notification.status = true;
		notification.user = user;
		const createdNotification = await this.notificationRepository.save(notification);
		this.cronService.addCron(createdNotification);

		return notification;
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
