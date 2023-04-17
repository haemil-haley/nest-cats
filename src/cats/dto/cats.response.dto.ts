import { ApiProperty, PickType } from "@nestjs/swagger";
import { Cat } from "../cats.schema";

export class ReadOnlyCatDto extends PickType(Cat, ['email', 'name'] as const) {
  @ApiProperty({
    example: '23810',
    description: 'id',
    required: true
  })
  id: string;
}
/*
export class ReadOnlyCatDto {
  @ApiProperty({
    example: '23810',
    description: 'id',
    required: true
  })
  id: string;

  @ApiProperty({
    example: 'bluecat@test.com',
    description: 'email',
    required: true
  })
  email: string;

  @ApiProperty({
    example: 'blue',
    description: 'name',
    required: true
  })
  name: string;
}
*/