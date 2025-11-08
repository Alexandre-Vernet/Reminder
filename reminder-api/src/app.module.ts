import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationEntity } from './app/notification/notification.entity';
import { FcmTokenUserEntity } from './app/fcm-token-user/fcm-token-user.entity';
import { FcmTokenUserModule } from './app/fcm-token-user/fcm-token-user.module';
import { AuthModule } from './app/auth/auth.module';
import { UserEntity } from './app/auth/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { NotificationModule } from './app/notification/notification.module';
import { CronModule } from './app/cron/cron.module';
import { ConfigModule } from "@nestjs/config";
import { RootModule } from "./app/root/root.module";
import { FcmModule } from "./app/fcm/fcm.module";

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		ScheduleModule.forRoot(),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.POSTGRES_HOST,
			port: Number(process.env.POSTGRES_PORT),
			username: process.env.POSTGRES_USERNAME,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DATABASE,
			entities: [UserEntity, NotificationEntity, FcmTokenUserEntity],
			synchronize: true,
		}),
		JwtModule.register({
			global: true,
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: '1d' },
		}),
		FcmTokenUserModule,
		AuthModule,
		NotificationModule,
		CronModule,
		RootModule,
		FcmModule
	],
})
export class AppModule {
}
