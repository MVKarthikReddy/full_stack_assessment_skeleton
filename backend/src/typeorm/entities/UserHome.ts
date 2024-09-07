import { Entity, PrimaryColumn } from 'typeorm';

// This table refers to user_home_tb table
@Entity({ name: 'user_home_tb' })
export class UserHome {
  @PrimaryColumn()
  username: string;

  @PrimaryColumn()
  street_name: string;
}
