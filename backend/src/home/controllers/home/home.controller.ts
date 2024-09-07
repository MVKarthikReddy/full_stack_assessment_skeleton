import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { UpdateUsersDto } from 'src/dtos/update-users.dto';
import { HomeService } from 'src/home/services/home/home.service';
import { Home } from 'src/typeorm/entities/Home';

@Controller('home')
export class HomeController {
  constructor(private homeService: HomeService) {}

  // GET : home/find-by-user/
  // If no user is selected this will trigger
  @Get('find-by-user/')
  find() {
    return {
      message: 'Please select a User',
    };
  }

  // GET : home/find-by-user/:username
  // this will return all the homes corresponding to a particular user
  @Get('find-by-user/:username')
  async findByUser(@Param('username') username: string): Promise<Home[]> {
    const res = await this.homeService.findHomesByUser(username);
    return res;
  }


  // PUT : home/update-users
  // this will return a particular home corresponding to users after updating
  @Put('update-users')
  async updateUsers(@Body() updateUserHomeDto: UpdateUsersDto) {
    const result = await this.homeService.updateUsersForHome(updateUserHomeDto);
    return result;
  }
}
