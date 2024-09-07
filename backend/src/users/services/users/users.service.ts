import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    // This decorator(@InjectRepository) helps us to inject a repository corresponding to a particular entity(table in db)
    @InjectRepository(User) private userRepository: Repository<User>, // [For injecting user repo] 
  ) {}

  fetchUsers() {
    // find() -> To retrieve and return all the users 
    return this.userRepository.find();
  }

  // This will create a db_query for retrieving users of a particular home
  findUsersByHome(streetName: string) {
    return this.userRepository
      .createQueryBuilder('user')
      .innerJoin('user_home_tb', 'uh', 'uh.username = user.username')
      .innerJoin('home', 'h', 'h.street_name = uh.street_name')
      .where('h.street_name = :streetName', { streetName })
      .getMany();
  }
}
