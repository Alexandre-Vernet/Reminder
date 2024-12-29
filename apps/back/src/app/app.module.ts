import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { NotificationService } from "./notification/notification.service";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./user/user.entity";
import { NotificationEntity } from "./notification/notification.entity";
import { SubscriptionEntity } from "./subscription/subscription.entity";
import { SubscriptionModule } from "./subscription/subscription.module";
import process from 'node:process';


const {
	POSTGRES_HOST,
	POSTGRES_PORT,
	POSTGRES_USERNAME,
	POSTGRES_PASSWORD,
	POSTGRES_DATABASE
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
		SubscriptionModule,
	],
	controllers: [AppController],
	providers: [NotificationService],
})
export class AppModule {
}
