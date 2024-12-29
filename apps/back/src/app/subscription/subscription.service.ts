import { Subscription } from "../../../../libs/interfaces";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";
import { SubscriptionEntity } from "./subscription.entity";

export class SubscriptionService {
	constructor(
		@InjectRepository(SubscriptionEntity)
		private readonly subscriptionRepository: Repository<SubscriptionEntity>
	) {
	}

	async createSubscription(subscription: Subscription) {
		const { endpoint, keys } = subscription;
		const { p256dh, auth } = keys;

		// Check if exist
		const options: FindOneOptions = {
			where: {
				endpoint,
			},
		}
		const existingSubscription = await this.subscriptionRepository.findOne(options);

		if (existingSubscription) {
			return existingSubscription;
		}
		return this.subscriptionRepository.save({
			endpoint,
			p256dh,
			auth,
		});
	}
}
