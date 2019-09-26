import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    next.handle().subscribe(res => {
      if (res.indexOf('HelloWorld') < 0) {
        console.log(`\n Strange response at: { route: ${context.switchToHttp().getRequest().url}, method: ${context.switchToHttp().getRequest().route.stack[0].method.toUpperCase()} } \n`)
      }
    });

    return next.handle()
      .pipe(
        map(data => (context.switchToHttp().getResponse().json({ success: true, msg: 'OK', data, error: [] })))
    );
  }
}
