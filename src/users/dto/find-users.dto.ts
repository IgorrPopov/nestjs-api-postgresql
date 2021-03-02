import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, Matches } from 'class-validator';

export class FindUsersDto {
  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @ApiProperty({ example: '45' })
  readonly id: number;

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
