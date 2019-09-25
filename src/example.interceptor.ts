import { Injectable, ExecutionContext, CallHandler } from '@nestjs/common';
import { NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ExampleInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Interceptors - start...');

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => console.log(`Interceptors finish... ${Date.now() - now}ms`)),
      );
  }
}
