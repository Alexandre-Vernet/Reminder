import { UserDto } from "../user/user.dto";

export class SubscriptionDto {
	endpoint: string;
	expirationTime: number | null;
	keys: {
		p256dh: string;
		auth: string;
	};
	user?: UserDto;
}
