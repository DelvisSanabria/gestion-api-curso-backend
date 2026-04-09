/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service.js';
import express from 'express';
import { CreateUserDto } from './dto/create-user.dto.js';
import { ValidateUserPipe } from './pipes/validateuser/validateuser.pipe.js';
import { AuthGuard } from './guards/auth/auth.guard.js';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

/* @UseGuards(AuthGuard) //aplicamos el guard de autenticación a todo el controlador para proteger todas las rutas */

@ApiTags('users') // Etiqueta para Swagger, agrupa las rutas de este controlador bajo "users"
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    const users = this.usersService.findAll();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return users;
  }

  @ApiOperation({ summary: 'Crea un nuevo usuario' }) // Descripción de la operación para Swagger
  //para definir una ruta post usamos el decorador @Post
  @Post()
  @HttpCode(HttpStatus.CREATED) //para indicar que la respuesta de esta ruta debe tener el código de estado 201 (creado)
  create(@Body() createUserDto: CreateUserDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    return this.usersService.create(createUserDto);
  }

  //Respuesta manual usando el objeto Response de Express
  @Get('manual')
  findWithCustomHeader(@Res() res: express.Response) {
    const users = this.usersService.findAll();
    res.header('X-Custom-Header', 'Valor personalizado');
    res.status(200).json(users);
  }
  /*  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  } */

  @Get(':id')
  @UseGuards(AuthGuard) //aplicamos el guard de autenticación a esta ruta para protegerla
  findOne(@Param('id', ValidateUserPipe) id: number) {
    return this.usersService.findOne(id);
  }
}
