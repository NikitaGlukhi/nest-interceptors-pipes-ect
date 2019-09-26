import {
  Controller,
  UseInterceptors,
  ValidationPipe,
  UsePipes,
  UseFilters,
  UseGuards,
  Query,
  Get,
  Post,
  Req,
  Res,
  Body,
} from '@nestjs/common';
import { ExampleInterceptor } from './example.interceptor';
import { ExampleException } from './example.exception';
import { HttpExceptionFilter } from './http-exception.filter';
import { TransformPipe } from './transform.pipe';
import { ExampleGuard } from './example.guard';
import { Example } from './example.decorator';
import { Validation } from './validation';
import { ResponseInterceptor } from './response.interceptor';

@Controller('examples')
@UseGuards(ExampleGuard)
@UseInterceptors(ResponseInterceptor)
export class AppController {

  constructor() {}

  @Get('all')
  @UseInterceptors(ExampleInterceptor)
  @UseFilters(new HttpExceptionFilter())
  aetAll(@Query('testParam', new TransformPipe()) query, @Res() res) {
    return query;
  }

  @Get('middleware')
  @UseInterceptors(ResponseInterceptor)
  getMiddleware(@Req() req, @Res() res) {
    res.json(req.query.testParam);
  }

  @Get('interceptor')
  @UseInterceptors(ExampleInterceptor)
  getInterceptor(@Req() req, @Res() res) {
    res.json({response: req.query.testParam});
  }

  @Get('exception')
  @UseFilters(new HttpExceptionFilter())
  getException(@Req() req, @Res() res) {
    if (req.query.testParam !== 'HelloWorld') {
      throw new ExampleException();
    } else {
      res.json({ response: req.query.testParam })
    }
  }

  @Get('pipes')
  getPipes(@Query('testParam', new TransformPipe()) query, @Res() res) {
    res.json({ response: query })
  }

  @Get('custom-decorator')
  getCustomDecorator(@Example('testParam') example: string, @Res() res) {
    res.json(example)
  }

  @Post('validation')
  @UsePipes(new ValidationPipe())
  create(@Body() body: Validation, @Res() res) {
    res.json({ response: body });
  }
}
