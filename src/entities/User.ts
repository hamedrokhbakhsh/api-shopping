import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

/*@Index('mobile', ['mobile'], { unique: true })*/
@Index('username', ['username'], { unique: true })
@Entity('_user', { schema: 'shopping' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'username', unique: true, length: 50 })
  username: string;


  @Column('varchar', { name: 'password', length: 50 })
  password: string;

  /*  @Column('varchar', { name: 'full_name', length: 50 })
    fullName: string;


    @Column('varchar', { name: 'mobile', unique: true, length: 50 })
    mobile: string;

    @Column('varchar', { name: 'email', nullable: true, length: 50 })
    email: string | null;


    @Column('varchar', { name: 'role', length: 50 })
    role: string;

    @Column('int', { name: 'status' })
    status: number;*/
}
