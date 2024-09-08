import { Controller, Get, Param } from '@nestjs/common';
import { User } from 'src/typeorm/entities/User';
import { UsersService } from 'src/users/services/users/users.service';


@Controller('user') 
export class UsersController {
  constructor(private userService: UsersService) {}

  // GET : user/find-all
  // To retrieve all the users 
  @Get('find-all')
  async getUsers() {
    const users = await this.userService.fetchUsers()
    return users
  }

  // GET : user/find-by-home/:streetName -> param
  // To retrieve all the users of a particular home 
  @Get('find-by-home/:streetName')
  async findByHome(@Param('streetName') streetName: string) {
    return this.userService.findUsersByHome(streetName);
  }
}
