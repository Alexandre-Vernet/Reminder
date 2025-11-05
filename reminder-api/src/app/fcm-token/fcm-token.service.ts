import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, Repository } from "typeorm";
import { FcmTokenEntity } from "./fcm-token.entity";
import { FcmTokenDto } from "../interfaces";

export class FcmTokenService {
	constructor(
		@InjectRepository(FcmTokenEntity)
		private readonly fcmTokenEntityRepository: Repository<FcmTokenEntity>
	) {
	}

	findTokenByUserId(userId: number) {
		const options: FindManyOptions = {
			where: {
				user: {
					id: userId
				}
			}
		}
		return this.fcmTokenEntityRepository.find(options);
	}

	async createToken(fcmToken: FcmTokenDto) {
		const existingToken = await this.fcmTokenEntityRepository.findOne({
			where: {
				token: fcmToken.token,
				user: {
					id: fcmToken.user.id
				}
			}
		});

		if (existingToken) {
			return existingToken;
		}

		return this.fcmTokenEntityRepository.save({
			user: {
				id: fcmToken.user.id,
			},
			token: fcmToken.token,
		});
	}
}
