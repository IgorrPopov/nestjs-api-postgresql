import { ApiProperty } from '@nestjs/swagger';
import { IsFirebasePushId, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class FindUsersDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsFirebasePushId()
  @ApiProperty({ example: '5QujReZ4R2tHQNPwip66' })
  readonly id: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Fred' })
  readonly firstName: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Flintstone' })
  readonly lastName: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Matches(/^(user|admin)$/)
  @ApiProperty({ example: 'user' })
  readonly status: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Matches(/^(fe)?male$/)
  @ApiProperty({ example: 'male' })
  readonly gender: string;
}
