import { Injectable } from '@nestjs/common';
import { FcmTokenDto, NotificationDto } from "../interfaces";
import { getMessaging, Message } from "firebase-admin/messaging";
import { FcmTokenUserService } from "../fcm-token-user/fcm-token-user.service";

@Injectable()
export class FcmService {

	constructor(
		private readonly fcmTokenService: FcmTokenUserService
	) {
	}

	async sendNotification(fcmTokens: FcmTokenDto[], notification: NotificationDto) {
		fcmTokens.map(async (fcmToken) => {
			const message: Message = {
				notification: {
					title: notification.title,
					body: notification.description,
				},
				android: {
					priority: 'high',
					notification: {
						sound: 'test',
						channelId: 'id'
						// icon: 'icon'
					},
				},
				data: {
					score: '850',
					time: '2:45'
				},
				token: fcmToken.token
			};

			getMessaging().send(message)
				.catch((error) => {
					console.log('Error sending message:', error);

					if (error?.errorInfo?.code === 'messaging/registration-token-not-registered') {
						console.warn('Invalid token', fcmToken.token);
						this.fcmTokenService.delete(fcmToken.token);
					}
				});
		});
	}
}
