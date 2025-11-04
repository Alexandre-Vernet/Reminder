import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessageService } from "primeng/api";
import { Toast } from "primeng/toast";
import { PushNotifications } from "@capacitor/push-notifications";
import { ViewWillEnter } from "@ionic/angular";

@Component({
  imports: [RouterModule, Toast],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  providers: [MessageService]
})
export class AppComponent implements OnInit, ViewWillEnter {

  constructor() {
  }

  ngOnInit() {
    this.initializePush();
  }

  ionViewWillEnter() {
    this.initializePush();
  }

  initializePush() {
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        PushNotifications.register();
      } else {
        console.log('Permission refusée');
      }
    });

    PushNotifications.addListener('registration', (token) => {
      console.log('Token reçu :', token.value);
    });

    PushNotifications.addListener('pushNotificationReceived', (notif) => {
      console.log('Notification reçue :', notif);
    });
  }
}
