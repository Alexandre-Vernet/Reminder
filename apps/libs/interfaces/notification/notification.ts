import { UserDto } from "../user/UserDto";

export interface NotificationDto {
	id?: number;
	name: string;
	cron: string;
	title: string;
	description: string;
	status?: boolean;
	createdAt?: Date;
	user?: UserDto;
}
