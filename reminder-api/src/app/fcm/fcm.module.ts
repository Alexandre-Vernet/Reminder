import { Module } from '@nestjs/common';
import { FcmService } from './fcm.service';
import { FcmTokenModule } from "../fcm-token/fcm-token.module";

@Module({
	imports: [FcmTokenModule],
  providers: [FcmService],
	exports: [FcmService]
})
export class FcmModule {}
