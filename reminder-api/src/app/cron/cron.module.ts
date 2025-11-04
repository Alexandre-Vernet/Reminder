import { Module } from '@nestjs/common';
import { CronService } from "./cron.service";
import { FcmTokenModule } from "../fcm-token/fcm-token.module";

@Module({
	imports: [FcmTokenModule],
	providers: [CronService],
	exports: [CronService]
})
export class CronModule {}
