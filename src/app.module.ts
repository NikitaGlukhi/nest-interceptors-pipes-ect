import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { ExampleMiddleware } from './example.middleware';
import { ResponseMiddleware } from './response.middleware';

@Module({
  controllers: [ AppController ]
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ExampleMiddleware)
      .forRoutes({
        path: 'examples/middleware',
        method: RequestMethod.ALL
      })
      .apply(ResponseMiddleware)
      .forRoutes({
        path: '/',
        method: RequestMethod.ALL
      })
  }
}
