import { UserDto } from "../user/user.dto";

export interface NotificationDto {
	id?: number;
	name: string;
	cron: string;
	title: string;
	description: string;
	status: boolean;
	createdAt?: Date;
	user?: UserDto;
}
