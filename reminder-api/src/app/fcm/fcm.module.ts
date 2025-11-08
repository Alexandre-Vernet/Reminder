import { Module } from '@nestjs/common';
import { FcmService } from './fcm.service';
import { FcmTokenUserModule } from "../fcm-token-user/fcm-token-user.module";

@Module({
	imports: [FcmTokenUserModule],
  providers: [FcmService],
	exports: [FcmService]
})
export class FcmModule {}
