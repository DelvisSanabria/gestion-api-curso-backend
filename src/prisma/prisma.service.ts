import { Injectable } from '@nestjs/common';
import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    //configuramos la conexion a la base de datos usando el pool de pg
    const connectionString = process.env.DATABASE_URL;
    const pool = new Pool({ connectionString });
    //creamos el adaptador de Prisma para Postgres usando el pool
    const adapter = new PrismaPg(pool);
    //pasamos el adaptador a la clase base de PrismaClient
    super({ adapter });
  }
}
