import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, Repository } from "typeorm";
import { NotificationEntity } from "./notification.entity";
import { NotificationDto, UserDto } from "../../../../libs/interfaces";
import { CronService } from "../cron/cron.service";
import { SchedulerRegistry } from "@nestjs/schedule";

@Injectable()
export class NotificationService implements OnModuleInit {

	constructor(
		@InjectRepository(NotificationEntity)
		private notificationRepository: Repository<NotificationEntity>,
		private readonly cronService: CronService,
		private schedulerRegistry: SchedulerRegistry,
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
		if (notification.status) {
			this.cronService.addCron(notification);
		} else {
			this.cronService.deleteCron(notificationId);
		}

		notification.updatedAt = new Date();
		await this.notificationRepository.update(notificationId, notification);
		return this.notificationRepository.findOne({ where: { id: notificationId } });
	}

	async delete(notificationId: number) {
		const notification = await this.notificationRepository.findOne({
			where: { id: notificationId }
		});


		if (notification.status) {
			const cronExists = this.schedulerRegistry.doesExist('cron', notificationId.toString());
			if (cronExists) {
				this.cronService.deleteCron(notificationId);
			}
		}

		return this.notificationRepository.delete(notificationId);
	}
}
