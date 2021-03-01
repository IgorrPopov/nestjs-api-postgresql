import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, Matches, MaxLength } from 'class-validator';
import { smallStringMaxLength } from 'src/common/constants/common.const';

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(smallStringMaxLength)
  @ApiProperty({ example: 'Fred' })
  readonly firstName: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(smallStringMaxLength)
  @ApiProperty({ example: 'Flintstone' })
  readonly lastName: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(smallStringMaxLength)
  @Matches(/^(user|admin)$/)
  @ApiProperty({ example: 'user' })
  readonly status: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(smallStringMaxLength)
  @Matches(/^(fe)?male$/)
  @ApiProperty({ example: 'male' })
  readonly gender: string;
}
