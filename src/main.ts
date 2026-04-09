import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common/pipes/index.js';
/* import { AuthGuard } from './users/guards/auth/auth.guard.js'; */
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*', // Permite solicitudes desde cualquier origen (puedes restringirlo a dominios específicos)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos HTTP permitidos
    allowedHeaders: 'Content-Type, Accept', // Encabezados permitidos
    credentials: true, // Permite enviar cookies y credenciales en solicitudes CORS
  }); // Habilita CORS para permitir solicitudes desde otros dominios

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades no definidas en el DTO
      forbidNonWhitelisted: true, // Lanza un error si se envían propiedades no definidas
      /* transform: true, // Transforma los payloads a los tipos definidos en los DTOs */
    }),
  );

  //configurar swagger
  const config = new DocumentBuilder()
    .setTitle('API de Gestión de Usuarios')
    .setDescription('API para gestionar usuarios con NestJS')
    .setVersion('1.0')
    .addTag('users', 'Endpoints relacionados con usuarios')
    .addTag('auth', 'Endpoints relacionados con autenticación')
    .addTag('tasks', 'Endpoints relacionados con tareas')
    .build();

  // Crea el documento de Swagger a partir de la configuración y los controladores definidos en AppModule
  const document = SwaggerModule.createDocument(app, config);

  // Configura Swagger en la ruta /api
  SwaggerModule.setup('api', app, document);

  /* app.useGlobalGuards(AuthGuard); // Aquí puedes agregar tus guards globales si los tienes */
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
