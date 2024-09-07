import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController], // These are for handling routes (passes the request to providers)
  providers: [UsersService] // Provieders provide service to make actions on data(CRUD)
})
export class UsersModule {}
