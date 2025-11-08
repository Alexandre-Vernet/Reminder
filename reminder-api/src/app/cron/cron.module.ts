import { Module } from '@nestjs/common';
import { CronService } from "./cron.service";
import { FcmTokenModule } from "../fcm-token/fcm-token.module";
import { FcmModule } from "../fcm/fcm.module";

@Module({
	imports: [FcmTokenModule, FcmModule],
	providers: [CronService],
	exports: [CronService]
})
export class CronModule {}
