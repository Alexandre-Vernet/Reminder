import { Module } from "@nestjs/common";
import { FcmTokenController } from "./fcm-token.controller";
import { FcmTokenService } from "./fcm-token.service";
import { FcmTokenEntity } from "./fcm-token.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";

@Module({
	imports: [
		TypeOrmModule.forFeature([FcmTokenEntity]),
		AuthModule
	],
	controllers: [FcmTokenController],
	providers: [FcmTokenService],
	exports: [FcmTokenService],
})
export class FcmTokenModule {
}
