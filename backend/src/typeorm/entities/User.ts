import {
  Column,
  Entity,
  ManyToMany,
  PrimaryColumn,
  JoinTable,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Home } from './Home';
import { UserHome } from './UserHome';

// This entity corresponds to user table in the db
@Entity({ name: 'user' })
export class User {
  @PrimaryColumn()
  username: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => UserHome, (userHome) => userHome.home)
  userHomes: UserHome[];

  @ManyToMany(() => Home, (home) => home.users)
  homes: Home[];
}
