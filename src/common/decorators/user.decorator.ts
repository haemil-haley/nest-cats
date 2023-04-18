import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { CatCurrentDto } from "../../cats/dto/cat.current.dto";

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    return request.user as CatCurrentDto;
  },
);