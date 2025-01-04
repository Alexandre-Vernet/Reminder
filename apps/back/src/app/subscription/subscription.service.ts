import { SubscriptionDto } from "../../../../libs/interfaces";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, FindOneOptions, Repository } from "typeorm";
import { SubscriptionEntity } from "./subscription.entity";

export class SubscriptionService {
	constructor(
		@InjectRepository(SubscriptionEntity)
		private readonly subscriptionRepository: Repository<SubscriptionEntity>
	) {
	}

	findSubscriptionByUserId(userId: number) {
		const options: FindManyOptions = {
			where: {
				user: {
					id: userId
				}
			}
		}
		return this.subscriptionRepository.find(options);
	}

	async createSubscription(subscription: SubscriptionDto) {
		const { endpoint, keys, user } = subscription;
		const { p256dh, auth } = keys;

		// Check if exist
		const options: FindOneOptions = {
			where: {
				endpoint,
				p256dh,
				auth
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
			user
		});
	}
}
