import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Home } from 'src/typeorm/entities/Home';
import { User } from 'src/typeorm/entities/User';
import { UserHome } from 'src/typeorm/entities/UserHome';
import { Repository } from 'typeorm';
import { UpdateUsersDto } from 'src/dtos/update-users.dto';

@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(Home)
    private homeRepository: Repository<Home>, // For intecting Home entity (table)

    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // For intecting User entity (table)

    @InjectRepository(UserHome)
    private readonly userHomeRepository: Repository<UserHome>,
  ) {}

  // This query retrieves homes correspinding to a particular user
  async findHomesByUser(username: string) {
    const homes = await this.homeRepository
      .createQueryBuilder('home')
      .innerJoin(
        'user_home_tb',
        'uh',
        'uh.street_address = home.street_address',
      )
      .where('uh.username = :username', { username })
      .getMany();

    return homes;
  }

  // This will update the junction table (i.e. users -> homes and homes -> users) and returns the updated values
  async updateUsersForHome(updateUserHomeDto: UpdateUsersDto) {
    const { street_address, users } = updateUserHomeDto; // destructuring the DTO

    const home = await this.homeRepository.findOne({
      where: { street_address: street_address },
      relations: ['users'],
    });

    if (!home) {
      throw new NotFoundException('Home not found');
    }

    // To Find users to attach
    const userHomes = await this.userRepository.findByIds(users);

    // To Update the users related to this home
    home.users = userHomes;

    // To Save the updated home entity, this will update the user_home_tb table
    await this.homeRepository.save(home);

    return home
  }
}
