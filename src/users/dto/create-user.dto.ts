/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'H0A8o@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email!: string;
  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'SecurePass123',
  })
  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @IsNotEmpty()
  password!: string;
  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Juan',
  })
  @IsString()
  @IsNotEmpty()
  firstName!: string;
  @ApiProperty({
    description: 'Apellido del usuario',
    example: 'Pérez',
  })
  @IsString()
  @IsNotEmpty()
  lastName!: string;
}
