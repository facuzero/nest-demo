import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { globalLogger } from './middlewares/logger.middleware';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('Proyecto integrador BACK: Facundo Diaz')
    .setDescription('Documentacion creada con nest SWAGGER')
    .setVersion('1.0.0')
    .addBearerAuth() // Autorizacion para rutas, en este caso el token
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.use(globalLogger);
  await app.listen(3000);
}
bootstrap();
