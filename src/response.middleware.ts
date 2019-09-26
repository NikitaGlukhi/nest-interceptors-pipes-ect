import { NestMiddleware, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class ResponseMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void): any {
    console.log('Middleware - start...');
    req.query.testParam = 'HelloWord';
    console.log('Middleware - finish...');
    return next();
  }
}
