import { Body, Controller, Post } from "@nestjs/common";
import { SubscriptionDto } from "../../../../libs/interfaces";
import { SubscriptionService } from "./subscription.service";

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
