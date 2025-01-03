import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { NotificationEntity } from "./notification.entity";
import { AuthModule } from "../auth/auth.module";

@Module({
	imports: [TypeOrmModule.forFeature([NotificationEntity]), AuthModule],
	controllers: [NotificationController],
	providers: [NotificationService],
	exports: [NotificationService]
})
export class NotificationModule {}
