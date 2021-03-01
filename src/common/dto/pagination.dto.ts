import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  MaxLength,
} from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @ApiProperty({
    name: 'limit',
    required: false,
    description: `Limit the number of documents that the API will return.`,
    example: 5,
  })
  limit: number;

  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @ApiProperty({
    name: 'start',
    required: false,
    description: `Set start position of the first document in the database that will be 
    added to the array and return from the API.`,
    example: 2,
  })
  start: number;
}