import { Module } from '@nestjs/common';
import { CronService } from "./cron.service";
import { SubscriptionModule } from "../subscription/subscription.module";

@Module({
	imports: [SubscriptionModule],
	providers: [CronService],
	exports: [CronService]
})
export class CronModule {}
