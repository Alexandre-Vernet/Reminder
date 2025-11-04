import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from "@nestjs/schedule";
import { CronJob } from "cron";
// import * as webPush from "web-push";
import { FcmTokenService } from "../fcm-token/fcm-token.service";
import { NotificationDto, FcmTokenDto } from "../interfaces";

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
		const {
			WEB_PUSH_EMAIL,
			WEB_PUSH_PUBLIC_KEY,
			WEB_PUSH_PRIVATE_KEY,
		} = process.env;

		const subscriptions = await this.subscriptionService.findTokenByUserId(notification.user.id);

		subscriptions.map(async (subscription) => {
			const sub: FcmTokenDto = {
				token: subscription.token,
			}

			const payload = {
				notification: {
					title: notification.title,
					body: notification.description,
					data: { url: "https://www.google.com" },
					actions: [
						{ action: "www.google.com", title: "Open URL" }
					],
					icon: notification.imageURL,
					vibrate: [100, 50, 100],
				}
			}

			// webPush.setVapidDetails(`mailto:${ WEB_PUSH_EMAIL }`, WEB_PUSH_PUBLIC_KEY, WEB_PUSH_PRIVATE_KEY);
			//
			// await webPush.sendNotification(sub, JSON.stringify(payload));
		});
	}
}
