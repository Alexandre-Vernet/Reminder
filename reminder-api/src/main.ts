import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import admin from "firebase-admin";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

	app.enableCors({
		origin: [
			process.env.ALLOWED_ORIGIN,
			'capacitor://localhost',
			'http://localhost',
			'https://localhost',
		],
		credentials: true
	});

	const serviceAccount = JSON.parse(Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64!, 'base64').toString('utf8'));

	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
	});


  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 8080;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
