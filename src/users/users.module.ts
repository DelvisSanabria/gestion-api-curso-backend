import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { UsersController } from './users.controller.js';
import { LoggerMiddleware } from './logger/logger.middleware.js';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('users');
  }
}
