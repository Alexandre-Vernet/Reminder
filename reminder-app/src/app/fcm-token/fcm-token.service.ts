import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FcmTokenDto, UserDto } from "../interfaces";
import { environment } from "../../environments/environment";
import { PushNotifications } from "@capacitor/push-notifications";
import { NotificationService } from "../notification/notification.service";

@Injectable({
  providedIn: 'root'
})
export class FcmTokenService {

  subscriptionUri = environment.subscriptionUri();

  constructor(
    private readonly http: HttpClient,
  ) {
  }

  requestFcmToken(user: UserDto) {
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        PushNotifications.register();
      } else {
        console.log('Permission refusée');
      }
    });

    PushNotifications.addListener('registration', (token) => {
      console.log('Token reçu :', token.value);

      const payload = { token: token.value, user };

      this.storeToken(payload).subscribe({
        next: () => console.log('✅ Token FCM enregistré pour', user.id),
        error: (err) => console.error('Erreur enregistrement FCM :', err),
      });
    });

    PushNotifications.addListener('pushNotificationReceived', (notif) => {
      console.log('🔔 Notification reçue :', notif);
    });
  }

  storeToken(fcmTokenDto: FcmTokenDto) {
    return this.http.post<FcmTokenDto>(this.subscriptionUri, fcmTokenDto);
  }
}
