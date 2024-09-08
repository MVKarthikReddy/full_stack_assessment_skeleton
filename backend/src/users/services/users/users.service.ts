import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { UserHome } from 'src/typeorm/entities/UserHome';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    // This decorator(@InjectRepository) helps us to inject a repository corresponding to a particular entity(table in db)
    @InjectRepository(User) private userRepository: Repository<User>, // [For injecting user repo]

    @InjectRepository(UserHome)
    private readonly userHomeRepository: Repository<UserHome>,
  ) {}

  async fetchUsers() {
    // find() -> To retrieve and return all the users
    const res = await this.userRepository.find();
    return res;
  }

  // This will create a db_query for retrieving users of a particular home
  async findUsersByHome(streetName: string) {
    const usersOfHomes = await this.userRepository
      .createQueryBuilder('user')
      .innerJoin('user_home_tb', 'uh', 'uh.username = user.username')
      .where('uh.street_address = :streetName', { streetName })
      .getMany();

    

    return usersOfHomes; // Returning an array of User entities
  }
}
