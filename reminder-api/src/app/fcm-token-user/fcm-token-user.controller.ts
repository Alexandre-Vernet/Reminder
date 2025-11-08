import { Body, Controller, Post, UseInterceptors } from "@nestjs/common";
import { FcmTokenUserService } from "./fcm-token-user.service";
import { AuthInterceptor } from "../auth/auth.interceptor";
import { FcmTokenDto } from "../interfaces";

@UseInterceptors(AuthInterceptor)
@Controller('fcm-token')
export class FcmTokenUserController {

	constructor(
		private readonly fcmTokenService: FcmTokenUserService
	) {
	}

	@Post()
	createSubscription(@Body() fcmTokenDto: FcmTokenDto) {
		return this.fcmTokenService.createToken(fcmTokenDto);
	}
}
