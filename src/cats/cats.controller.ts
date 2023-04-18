import { Body, Controller, Get, Post, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CatsService } from "./cats.service";
import { CatsRequestDto } from "./dto/cats.request.dto";
import { ReadOnlyCatDto } from "./dto/cats.response.dto";
import { AuthService } from "../auth/auth.service";
import { LoginRequestDto } from "../auth/dto/login.request.dto";
import { JwtAuthGuard } from "../auth/jwt/jwt.guard";
import { Request } from "express";
import { SuccessInterceptor } from "../common/interceptors/success.interceptor";
import { CurrentUser } from "../common/decorators/user.decorator";
import { CatCurrentDto } from "./dto/cat.current.dto";
import { Cat } from "./cats.schema";

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService
  ) {}

  @ApiOperation({ summary: '현재 고양이 가져오기' })
  // @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentCat(@CurrentUser() cat: CatCurrentDto) {
    console.log(cat);
    return cat.readOnlyData;
  }

  @ApiResponse({
    status: 500,
    description: 'Server error...'
  })
  @ApiResponse({
    status: 200,
    description: '성공!',
    type: ReadOnlyCatDto
  })
  @ApiOperation({ summary: '회원가입' })
  @Post()
  async signUp(@Body() body: CatsRequestDto) {
    return this.catsService.signUp(body);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  logIn(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogIn(data);
  }

  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  logOut() {
    return 'logout';
  }

  @ApiOperation({ summary: '고양이 이미지 업로드' })
  @Post('upload/cats')
  uploadCatImg() {
    return 'uploadImg';
  }
}
