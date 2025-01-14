import { Body, Controller, Post, UseInterceptors } from "@nestjs/common";
import { SubscriptionDto } from "../../../../libs/interfaces";
import { SubscriptionService } from "./subscription.service";
import { AuthInterceptor } from "../auth/auth.interceptor";

@UseInterceptors(AuthInterceptor)
@Controller('subscription')
export class SubscriptionController {

	constructor(
		private readonly subscriptionService: SubscriptionService
	) {
	}

	@Post()
	createSubscription(@Body() subscription: SubscriptionDto) {
		return this.subscriptionService.createSubscription(subscription);
	}
}
