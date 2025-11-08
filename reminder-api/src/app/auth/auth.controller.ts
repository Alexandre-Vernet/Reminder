import { Body, Controller, Delete, Param, Patch, Post, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from "../interfaces";

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {
	}

	@Post('sign-up')
	signUp(@Body() user: UserDto) {
		return this.authService.signUp(user);
	}

	@Post('sign-in')
	signIn(@Body() user: UserDto) {
		return this.authService.signIn(user);
	}

	@Post('sign-in-with-access-token')
	signInWithAccessToken(@Body() { accessToken }: { accessToken: string }) {
		return this.authService.signInWithAccessToken(accessToken);
	}

	@Patch(':id')
	update(@Param('id') id: number, @Body() user: UserDto) {
		return this.authService.update(id, user);
	}

	@Delete(':id')
	remove(@Param('id') id: number) {
		return this.authService.remove(id);
	}
}
