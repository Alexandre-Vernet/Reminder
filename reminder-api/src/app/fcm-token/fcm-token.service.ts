import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FcmTokenEntity } from "./fcm-token.entity";
import { FcmTokenDto } from "../interfaces";

export class FcmTokenService {
	constructor(
		@InjectRepository(FcmTokenEntity)
		private readonly fcmTokenEntityRepository: Repository<FcmTokenEntity>
	) {
	}

	findTokenByUserId(userId: number) {
		return this.fcmTokenEntityRepository.find({
			where: {
				user: {
					id: userId
				}
			}
		});
	}

	async createToken(fcmToken: FcmTokenDto) {
		const existingToken = await this.fcmTokenEntityRepository.findOne({
			where: {
				token: fcmToken.token
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
