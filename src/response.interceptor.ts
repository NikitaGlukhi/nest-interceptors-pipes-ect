import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  counter = 0;

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle()
      .pipe(
        tap(data => {
          this.counter++;
          const res = context.switchToHttp().getResponse();
          const req = context.switchToHttp().getRequest();

          if (typeof data !== 'object' || data.indexOf('HelloWorld') < 0) {
            console.log(`\n Strange response at: { route: ${req.url}, response: ${JSON.stringify(data)}, method: ${req.route.stack[0].method.toUpperCase()} } \n`);
          }

          return res.json({ success: true, msg: 'OK', data, error: [], counter: this.counter });
        }),
      );
  }
}
