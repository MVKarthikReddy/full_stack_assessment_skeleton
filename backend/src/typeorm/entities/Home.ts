import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { User } from './User';

// This entity corresponds to home table in the db
@Entity({ name: 'home' })
export class Home {
  @PrimaryColumn()
  street_name: string;

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

  // A many to many relationship 
  @ManyToMany(() => User, (user) => user.homes)
  users: User[];
}
