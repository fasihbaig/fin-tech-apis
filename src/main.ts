import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiExceptionHandler } from './utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new ApiExceptionHandler());

  await app.listen(3000);
}
bootstrap();
