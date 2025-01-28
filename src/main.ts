import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('escotBlog')
    .setDescription(
      'API RESTful creada con NestJS para gestionar artículos de blog. \
      Incluye CRUD completo, autenticación JWT, subida de imágenes a AWS S3, \
      filtros avanzados, documentación Swagger y despliegue automatizado \
      en Azure App Service.',
    )
    .setVersion('1.0')
    .addTag('blog')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();