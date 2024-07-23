import { Order } from 'src/orders/orders.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column({ length: 20 })
  password: string;

  @Column({ type: 'int' })
  phone: number;

  @Column({ length: 50 })
  country: string;

  @Column()
  address: string;

  @Column({ length: 50 })
  city: string;

  @OneToMany(() => Order, (order) => order.user_id)
  @JoinColumn({ name: 'order_id' })
  orders_id: Order[];
}
