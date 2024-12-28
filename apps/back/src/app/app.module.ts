import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {NotificationService} from "./notification/notification.service";
import {ScheduleModule} from "@nestjs/schedule";
import * as webPush from "web-push";

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [NotificationService],
})
export class AppModule {
}
