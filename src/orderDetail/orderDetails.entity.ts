import { Order } from 'src/orders/orders.entity';
import { Product } from 'src/products/products.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
@Entity({
  name: 'orderDetails',
})
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @ManyToOne(() => Order, (order) => order.orderDetail)
  @JoinColumn()
  order: Order;

  @ManyToMany(() => Product, (product) => product.orderDetails)
  @JoinTable()
  products: Product[];
}
