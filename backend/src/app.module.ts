import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { UsersModule } from './users/users.module';
import { HomeModule } from './home/home.module';
import { Home } from './typeorm/entities/Home';
import { ConfigModule } from '@nestjs/config';
import { UserHome } from './typeorm/entities/UserHome';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // This makes the config module accessible throughout the application
      envFilePath: '.env', 
    }),
    // To connect with mysql database
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DB_USER_NAME,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [User, Home, UserHome], // Entities are the classes that represent the Tables in the database
      synchronize: false,
    }),
    UsersModule,
    HomeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
