import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: '12' })
  readonly id: number;

  @Column()
  @ApiProperty({ example: 'Fred' })
  readonly firstName: string;

  @Column()
  @ApiProperty({ example: 'Flintstone' })
  readonly lastName: string;

  @Column()
  @ApiProperty({ example: 'user' })
  readonly status: string;

  @Column()
  @ApiProperty({ example: 'male' })
  readonly gender: string;
}

