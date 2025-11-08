import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FcmTokenUserEntity } from "./fcm-token-user.entity";
import { FcmTokenDto } from "../interfaces";

export class FcmTokenUserService {
	constructor(
		@InjectRepository(FcmTokenUserEntity)
		private readonly fcmTokenEntityRepository: Repository<FcmTokenUserEntity>
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

	async delete(fcmToken: string) {
		const fcmTokenDelete = await this.fcmTokenEntityRepository.findOne({
			where: {
				token: fcmToken
			}
		});

		return this.fcmTokenEntityRepository.delete(fcmTokenDelete.id);
	}
}
