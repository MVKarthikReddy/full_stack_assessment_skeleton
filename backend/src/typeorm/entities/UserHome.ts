
import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './User';
import { Home } from './Home';

@Entity('user_home_tb')
export class UserHome {
  // Composite Primary Key: username
  @PrimaryColumn()
  username: string;

  // Composite Primary Key: street_address
  @PrimaryColumn()
  street_address: string;

  // Many-to-One relationship with the User entity
  @ManyToOne(() => User, (user) => user.userHomes, { onDelete: 'CASCADE' })
  user: User;

  // Many-to-One relationship with the Home entity
  @ManyToOne(() => Home, (home) => home.userHomes, { onDelete: 'CASCADE' })
  home: Home;
}
