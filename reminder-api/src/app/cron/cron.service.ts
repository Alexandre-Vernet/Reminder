import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from "@nestjs/schedule";
import { CronJob } from "cron";
import { FcmTokenService } from "../fcm-token/fcm-token.service";
import { NotificationDto } from "../interfaces";
import { getMessaging, Message } from "firebase-admin/messaging";

@Injectable()
export class CronService {

	constructor(
		private schedulerRegistry: SchedulerRegistry,
		private readonly subscriptionService: FcmTokenService,
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

		fcmTokens.map(async (subscription) => {
			const message: Message = {
				notification: {
					title: notification.title,
					body: notification.description,
				},
				android: {
					priority: 'high',
					notification: {
						sound: 'test',
						icon: 'icon'
					},
				},
				data: {
					score: '850',
					time: '2:45'
				},
				token: subscription.token
			};

			getMessaging().send(message)
				.then((response) => {
					// Response is a message ID string.
					console.log('Successfully sent message:', response);
				})
				.catch((error) => {
					console.log('Error sending message:', error);
				});
		});
	}
}
