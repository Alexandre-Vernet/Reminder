import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseInterceptors, } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { AuthInterceptor } from "../auth/auth.interceptor";
import { NotificationDto, UserDto } from "../interfaces";

@UseInterceptors(AuthInterceptor)
@Controller('notification')
export class NotificationController {
	constructor(private readonly notificationService: NotificationService) {
	}

	@Post()
	create(@Body() { notification, user }: { notification: NotificationDto, user: UserDto }) {
		return this.notificationService.createNotification(notification, user);
	}

	@Post('multiple')
	createMultiple(@Body() { notification, user }: { notification: NotificationDto[], user: UserDto }) {
		return this.notificationService.createMultipleNotification(notification, user);
	}

	@Get()
	findAll(@Query('userId') userId: number) {
		return this.notificationService.findAllByUserId(userId);
	}

	@Patch(':id')
	update(@Param('id') id: number, @Body() notification: NotificationDto) {
		return this.notificationService.update(id, notification);
	}

	@Delete(':id')
	delete(@Param('id') id: number) {
		return this.notificationService.delete(id);
	}
}
