import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { DbService } from './core/db/db.service';

declare const module: any;

async function bootstrap() {
  const adapter = new FastifyAdapter({
    logger: true,
  });
  adapter.useStaticAssets({
    root: join(__dirname, '..', 'public'),
  });
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    adapter,
  );

  const dbService = app.get(DbService);
  dbService.enableShutdownHooks(app);

  app.setGlobalPrefix('v1/api');
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Remi')
    .addBearerAuth()
    .setDescription('The Remi API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3001, '0.0.0.0');

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
