import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ExampleGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('Guard - start...');
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  public validateRequest(request): any {
    const randomBoolValue = true;

    if (!request.query.testParam && !randomBoolValue ) {
      console.log('Guard - finish...');
      return false
    }
    else if (!randomBoolValue) {
      console.log('Guard - finish...');
      return false;
    }

    console.log('Guard - finish...');
    return true;
  }
}
