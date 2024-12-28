import {Component, OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {SwPush} from '@angular/service-worker';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true
})
export class AppComponent implements OnInit {

  constructor(
    private readonly http: HttpClient,
    private readonly sw: SwPush,
  ) {
    if (environment.production) {
      this.sw.requestSubscription({
        serverPublicKey: environment.serverPublicKey
      }).then(sub => console.log(JSON.stringify(sub)))
        .catch(err => console.error(err));
    }

    this.sw.messages.subscribe(msg => console.log(msg));
    this.sw.notificationClicks.subscribe(({action, notification}) => {
      window.open(notification.data.url);
      fetch('');
    });
  }

  ngOnInit() {
    if (!('serviceWorker' in navigator)) {
      console.warn('Service workers are not supported by this browser.');
      return;
    }

    if (this.sw.isEnabled) {
      console.log('Push notifications are enabled');
    } else {
      console.warn('Service workers are disabled.');
    }
  }
}
