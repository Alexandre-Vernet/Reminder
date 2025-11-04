import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class RootController {

	@Get()
	root() {
		return "Reminder API is running";
	}
}
