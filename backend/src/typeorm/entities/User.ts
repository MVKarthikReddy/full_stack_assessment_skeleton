import {
  Column,
  Entity,
  ManyToMany,
  PrimaryColumn,
  JoinTable,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Home } from './Home';

// This entity corresponds to user table in the db
@Entity({ name: 'user' })
export class User {
  @PrimaryColumn()
  username: string;

  @Column({ unique: true })
  email: string;

  @ManyToMany(() => Home, (home) => home.users, { cascade: true })
  @JoinTable({
    name: 'user_home_tb', // This defines the name of the junction table
    joinColumn: { name: 'username', referencedColumnName: 'username' }, // User FK
    inverseJoinColumn: {
      name: 'street_name',
      referencedColumnName: 'street_name',
    }, // Home FK
  })
  homes: Home[];
}
