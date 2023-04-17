import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CatsRequestDto {
  @ApiProperty({
    example: 'bluecat@test.com',
    description: 'email',
    required: true
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '23810',
    description: 'password',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'blue',
    description: 'name',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}