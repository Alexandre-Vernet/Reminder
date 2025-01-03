import { Body, Controller, Delete, Get, Param, Patch, Post, Query, } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationDto, UserDto } from "../../../../libs/interfaces";

@Controller('notification')
export class NotificationController {
	constructor(private readonly notificationService: NotificationService) {
	}

	@Post()
	create(@Body() { notification, user }: { notification: NotificationDto, user: UserDto }) {
		return this.notificationService.createNotification(notification, user);
	}

	@Get()
	findAll(@Query('userId') userId: number) {
		return this.notificationService.findAll(userId);
	}

	@Patch(':id')
	update(@Param('id') id: number, @Body() { notification }: { notification: NotificationDto }) {
		return this.notificationService.update(id, notification);
	}

	@Delete(':id')
	delete(@Param('id') id: number) {
		return this.notificationService.delete(id);
	}
}
