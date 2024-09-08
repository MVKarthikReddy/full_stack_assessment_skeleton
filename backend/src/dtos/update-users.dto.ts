import { ArrayNotEmpty, IsArray, IsString } from 'class-validator';


export class UpdateUsersDto {
  @IsString()
  street_address: string;

  @IsArray()
  users: string[];
}
