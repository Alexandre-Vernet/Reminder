import { Module } from "@nestjs/common";
import { SubscriptionController } from "./subscription.controller";
import { SubscriptionService } from "./subscription.service";
import { SubscriptionEntity } from "./subscription.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";

@Module({
	imports: [
		TypeOrmModule.forFeature([SubscriptionEntity]),
		AuthModule
	],
	controllers: [SubscriptionController],
	providers: [SubscriptionService],
	exports: [SubscriptionService],
})
export class SubscriptionModule {
}
