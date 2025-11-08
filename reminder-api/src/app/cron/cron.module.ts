import { Module } from '@nestjs/common';
import { CronService } from "./cron.service";
import { FcmTokenUserModule } from "../fcm-token-user/fcm-token-user.module";
import { FcmModule } from "../fcm/fcm.module";

@Module({
	imports: [FcmTokenUserModule, FcmModule],
	providers: [CronService],
	exports: [CronService]
})
export class CronModule {}
