import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from "@nestjs/schedule";
import { CronJob } from "cron";
import { FcmTokenUserService } from "../fcm-token-user/fcm-token-user.service";
import { NotificationDto } from "../interfaces";
import { FcmService } from "../fcm/fcm.service";

@Injectable()
export class CronService {

	constructor(
		private schedulerRegistry: SchedulerRegistry,
		private readonly subscriptionService: FcmTokenUserService,
		private readonly fcmService: FcmService
	) {
	}

	addCron(notification: NotificationDto) {
		this.checkJobExistsAndDelete(notification.id);

		if (notification.status) {
			const job = new CronJob(notification.cron, async () => {
				await this.sendNotification(notification);
			}, null, null, 'Europe/Paris');
			this.schedulerRegistry.addCronJob(notification.id.toString(), job);
			job.start();
		}
	}

	checkJobExistsAndDelete(notificationId: number) {
		const jobExists = this.schedulerRegistry.doesExist('cron', notificationId.toString());
		if (jobExists) {
			return this.schedulerRegistry.deleteCronJob(notificationId.toString());
		}
	}


	async sendNotification(notification: NotificationDto) {
		const fcmTokens = await this.subscriptionService.findTokenByUserId(notification.user.id);
		this.fcmService.sendNotification(fcmTokens, notification);
	}
}
