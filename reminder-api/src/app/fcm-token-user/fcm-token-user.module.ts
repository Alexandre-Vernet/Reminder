import { Module } from "@nestjs/common";
import { FcmTokenUserController } from "./fcm-token-user.controller";
import { FcmTokenUserService } from "./fcm-token-user.service";
import { FcmTokenUserEntity } from "./fcm-token-user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";

@Module({
	imports: [
		TypeOrmModule.forFeature([FcmTokenUserEntity]),
		AuthModule
	],
	controllers: [FcmTokenUserController],
	providers: [FcmTokenUserService],
	exports: [FcmTokenUserService],
})
export class FcmTokenUserModule {
}
