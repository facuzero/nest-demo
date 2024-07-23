import { OrderDetail } from 'src/orderDetail/orderDetails.entity';
import { User } from 'src/users/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
@Entity({
  name: 'orders',
})
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ nullable: false })
  date: Date;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order_id)
  orderDetail: OrderDetail[];

  @ManyToOne(() => User, (user) => user.orders_id)
  @JoinColumn({ name: 'user_id' })
  user_id: User;
}
