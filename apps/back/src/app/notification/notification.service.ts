import { Injectable } from '@nestjs/common';
import { Cron } from "@nestjs/schedule";
import * as webPush from 'web-push';
import process from 'node:process';


@Injectable()
export class NotificationService {

	// @Cron('0 20 * * *')
	// @Cron('* * * * * *')
	handleCron() {
		console.log("Sending notification");

		const {
			WEB_PUSH_EMAIL,
			WEB_PUSH_PUBLIC_KEY,
			WEB_PUSH_PRIVATE_KEY,
			WEB_PUSH_ENDPOINT,
			WEB_PUSH_P_256_DH,
			WEB_PUSH_AUTH
		} = process.env;


		const sub = {
			"endpoint": WEB_PUSH_ENDPOINT,
			"expirationTime": null,
			"keys": {
				"p256dh": WEB_PUSH_P_256_DH,
				"auth": WEB_PUSH_AUTH
			}
		}

		const payload = {
			notification: {
				title: "Hello World",
				body: "This is a test notification",
				data: { url: "https://www.google.com" },
				actions: [
					{ action: "www.google.com", title: "Open URL" }
				],
				icon: "https://cdn.iconscout.com/icon/free/png-256/node-js-1174925.png",
				vibrate: [100, 50, 100],
			}
		}


		webPush.setVapidDetails(`mailto:${ WEB_PUSH_EMAIL }`, WEB_PUSH_PUBLIC_KEY, WEB_PUSH_PRIVATE_KEY);


		webPush.sendNotification(sub, JSON.stringify(payload));
	}
}
