import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';
import { UserHome } from './UserHome';

// This entity corresponds to home table in the db
@Entity({ name: 'home' })
export class Home {
  @PrimaryGeneratedColumn()
  street_address: string;

  @Column()
  state: string;

  @Column()
  zip: string;

  @Column('decimal')
  sqft: number;

  @Column()
  beds: number;

  @Column()
  baths: number;

  @Column('decimal')
  list_price: number;

  @OneToMany(() => UserHome, (userHome) => userHome.user)
  userHomes: UserHome[];

  @ManyToMany(() => User, (user) => user.homes, { cascade: true })
  @JoinTable({
    name: 'user_home_tb',
    joinColumn: {
      name: 'street_address',
      referencedColumnName: 'street_address',
    },
    inverseJoinColumn: { name: 'username', referencedColumnName: 'username' },
  })
  users: User[];
}
