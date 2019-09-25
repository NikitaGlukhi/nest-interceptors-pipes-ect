import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class TransformPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('Pipe - start...');
    value += 'Pipe';
    console.log('Pipe - finish...');
    return value;
  }
}
