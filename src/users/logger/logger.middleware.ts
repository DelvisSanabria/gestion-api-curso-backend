import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`[Logger] Peticion entrante`);
    console.log(`Metodo: ${req.method}`);
    console.log(`Ruta: ${req.originalUrl}`);
    next();
  }
}
