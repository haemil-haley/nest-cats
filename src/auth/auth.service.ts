import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { CatsRepository } from "../cats/cats.repository";
import { LoginRequestDto } from "./dto/login.request.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor (
    private readonly catsRepository: CatsRepository,
    private jwtService: JwtService) {}

  async jwtLogIn(data: LoginRequestDto) {
    const { email, password } = data;

    // 해당하는 email 이 있는지
    const cat = await this.catsRepository.findCatByEmail(email);
    if(!cat) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해 주세요.');
    }

    // password 가 일치한지
    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      cat.password
    );

    if (!isPasswordValidated) {
      throw  new UnauthorizedException('이메일과 비밀번호를 확인해 주세요');
    }

    const payload = { email: email, sub: cat.id };  // sub: 토큰 고유 식별자

    return {
      token: this.jwtService.sign(payload)
    };
  }
}
