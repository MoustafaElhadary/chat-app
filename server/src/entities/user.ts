import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
@Entity('User')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  username: string
}
