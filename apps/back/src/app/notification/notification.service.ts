import { Injectable } from '@nestjs/common';
import {Cron} from "@nestjs/schedule";
import * as webPush from 'web-push';

@Injectable()
  export class NotificationService {

  constructor() {

  }

  // @Cron('* * * * * *')
  handleCron() {
    console.log("Sending notification");
    webPush.generateVAPIDKeys();


  }
}
