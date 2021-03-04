import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { smallStringMaxLength, longStringMaxLength } from 'src/common/constants/common.const';

export class CreateMessageDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(smallStringMaxLength)
  @ApiProperty({ example: 'token' })
  readonly userRegistrationToken: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(longStringMaxLength)
  @ApiProperty({ example: 'This is a message' })
  readonly message: string;
}