import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod
} from '@nestjs/common';
import { AppController } from './app.controller';
import { ExampleMiddleware } from './example.middleware';

@Module({
  controllers: [ AppController ]
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ExampleMiddleware)
      .forRoutes({
        path: 'examples/all',
        method: RequestMethod.ALL
      })
  }
}
