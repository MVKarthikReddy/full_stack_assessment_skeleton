import { Injectable } from '@nestjs/common';
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
  ) {}

  // This query retrieves homes correspinding to a particular user
  async findHomesByUser(username: string) {
    const homes = await this.homeRepository
      .createQueryBuilder('home')
      .innerJoin('user_home_tb', 'uh', 'uh.street_name = home.street_name')
      .where('uh.username = :username', { username })
      .getMany();

    return homes;
  }

  // This will update the junction table (i.e. users -> homes and homes -> users) and returns the updated values
  async updateUsersForHome(updateUserHomeDto: UpdateUsersDto): Promise<Home> {
    const { street_name, users } = updateUserHomeDto;

    // To find the home entity by street_name, including its existing users
    const home = await this.homeRepository.findOne({
      where: { street_name },
      relations: ['users'], // Ensure the users relationship is loaded
    });

    if (!home) {
      throw new Error('Home not found');
    }

    // To Find all the users by their usernames
    const usernames = await this.userRepository.findByIds(users);

    if (!users || users.length === 0) {
      throw new Error('No users found for the provided usernames');
    }

    // To Update the users associated with the home (ensure users is an array)
    home.users = usernames;

    // To Save the updated home entity (this will automatically update the junction table)
    return await this.homeRepository.save(home); // This will now return a single updated home
  }
}
