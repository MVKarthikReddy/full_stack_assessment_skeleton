import { ArrayNotEmpty, IsArray, IsString } from 'class-validator';


export class UpdateUsersDto {
  @IsString()
  street_name: string;

  @IsArray()
  users: string[];
}
