import { createParamDecorator } from '@nestjs/common';

export const Example = createParamDecorator((data: string, req) => {
  return data ? { response: req.query[data] } : req.query;
});
