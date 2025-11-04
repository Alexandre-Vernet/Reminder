import { Body, Controller, Post, UseInterceptors } from "@nestjs/common";
import { FcmTokenService } from "./fcm-token.service";
import { AuthInterceptor } from "../auth/auth.interceptor";
import { FcmTokenDto } from "../interfaces";

@UseInterceptors(AuthInterceptor)
@Controller('subscription')
export class FcmTokenController {

	constructor(
		private readonly fcmTokenService: FcmTokenService
	) {
	}

	@Post()
	createSubscription(@Body() fcmTokenDto: FcmTokenDto) {
		return this.fcmTokenService.createToken(fcmTokenDto);
	}
}
