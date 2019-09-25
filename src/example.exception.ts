import { HttpException, HttpStatus } from '@nestjs/common';

export class ExampleException extends HttpException {
  constructor() {
    console.log('Exception - start...');
    super('BadRequest', HttpStatus.BAD_REQUEST);
    console.log('Exception - finish...');
  }
}
