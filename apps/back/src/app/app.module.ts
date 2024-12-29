import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationEntity } from './notification/notification.entity';
import { SubscriptionEntity } from './subscription/subscription.entity';
import { SubscriptionModule } from './subscription/subscription.module';
import { AuthModule } from './auth/auth.module';
import process from 'node:process';
import { UserEntity } from "./auth/user.entity";
import { JwtModule } from "@nestjs/jwt";

const {
	POSTGRES_HOST,
	POSTGRES_PORT,
	POSTGRES_USERNAME,
	POSTGRES_PASSWORD,
	POSTGRES_DATABASE,
	JWT_SECRET
} = process.env;

@Module({
	imports: [
		ScheduleModule.forRoot(),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: POSTGRES_HOST,
			port: Number(POSTGRES_PORT),
			username: POSTGRES_USERNAME,
			password: POSTGRES_PASSWORD,
			database: POSTGRES_DATABASE,
			entities: [UserEntity, NotificationEntity, SubscriptionEntity],
			synchronize: true,
		}),
		JwtModule.register({
			global: true,
			secret: JWT_SECRET,
			signOptions: { expiresIn: '1d' }
		}),
		SubscriptionModule,
		AuthModule,
	],
})
export class AppModule {}
