import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { UsersModule } from '../users/users.module.js';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './guard/jwt.strategy.js';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'mySecretKey', // Clave secreta para firmar los tokens JWT (debería ser más segura en producción)
      signOptions: { expiresIn: '1h' }, // Opciones de expiración del token
    }),
  ],
  controllers: [],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
