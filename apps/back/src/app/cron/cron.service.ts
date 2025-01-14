import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from "@nestjs/schedule";
import { NotificationDto, SubscriptionDto } from "../../../../libs/interfaces";
import { CronJob } from "cron";
import process from "node:process";
import * as webPush from "web-push";
import { SubscriptionService } from "../subscription/subscription.service";

@Injectable()
export class CronService {

	constructor(
		private schedulerRegistry: SchedulerRegistry,
		private readonly subscriptionService: SubscriptionService,
	) {
	}

	addCron(notification: NotificationDto) {
		const job = new CronJob(notification.cron, async () => {
			console.log(new Date(), notification);
			await this.sendNotification(notification);
		}, null, null, 'Europe/Paris');
		this.schedulerRegistry.addCronJob(notification.id.toString(), job);
		job.start();
	}

	deleteCron(notificationId: number) {
		this.schedulerRegistry.deleteCronJob(notificationId.toString());
	}

	async sendNotification(notification: NotificationDto) {
		const {
			WEB_PUSH_EMAIL,
			WEB_PUSH_PUBLIC_KEY,
			WEB_PUSH_PRIVATE_KEY,
		} = process.env;

		const subscriptions = await this.subscriptionService.findSubscriptionByUserId(notification.user.id);

		subscriptions.map(async (subscription) => {
			const sub: SubscriptionDto = {
				endpoint: subscription.endpoint,
				expirationTime: null,
				keys: {
					p256dh: subscription.p256dh,
					auth: subscription.auth
				}
			}

			const payload = {
				notification: {
					title: notification.title,
					body: notification.description,
					data: { url: "https://www.google.com" },
					actions: [
						{ action: "www.google.com", title: "Open URL" }
					],
					icon: "https://cdn.iconscout.com/icon/free/png-256/node-js-1174925.png",
					vibrate: [100, 50, 100],
				}
			}

			webPush.setVapidDetails(`mailto:${ WEB_PUSH_EMAIL }`, WEB_PUSH_PUBLIC_KEY, WEB_PUSH_PRIVATE_KEY);

			await webPush.sendNotification(sub, JSON.stringify(payload));
		});
	}
}
