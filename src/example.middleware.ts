import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class ExampleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log('Middleware - start...');
    if (req.query.testParam === 'HelloWorld') {
      req.query.testParam += 1;
      console.log('Middleware - finish...');
      return next();
    } else {
      console.log('Middleware - finish...');
      res.json(new BadRequestException('Incorrect query parameter'));
    }
  }
}
