import { Module } from '@nestjs/common';
import { HomeController } from './controllers/home/home.controller';
import { HomeService } from './services/home/home.service';
import { Home } from 'src/typeorm/entities/Home';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { UserHome } from 'src/typeorm/entities/UserHome';

@Module({
  imports: [TypeOrmModule.forFeature([Home, User, UserHome])],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
