import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { join } from 'path';

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

  const config = new DocumentBuilder()
    .setTitle('Remi')
    .setDescription('The Remi API description')
    .setVersion('1.0')
    .addTag('remi')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3001, '0.0.0.0');
}
bootstrap();
