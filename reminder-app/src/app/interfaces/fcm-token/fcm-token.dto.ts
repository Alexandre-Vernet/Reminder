import { UserDto } from "../user/user.dto";

export class FcmTokenDto {
	token: string;
	user?: UserDto;
}
