import { Body, Controller, Delete, Param, Patch, Post, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from "../../../../libs/interfaces";

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {
	}

	@Post('sign-up')
	signUp(@Body() user: User) {
		return this.authService.signUp(user);
	}

	@Post('sign-in')
	signIn(@Body() user: User) {
		return this.authService.signIn(user);
	}

	@Patch(':id')
	update(@Param('id') id: number, @Body() updateAuthDto: User) {
		return this.authService.update(id, updateAuthDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.authService.remove(+id);
	}
}
