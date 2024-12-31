import { ExecutionContext } from '@nestjs/common';

export const returnUnauthorized = (context: ExecutionContext, message = 'Unauthorized') => {
	const response = context.switchToHttp().getResponse();
	response.status(401).send({ message });
};
