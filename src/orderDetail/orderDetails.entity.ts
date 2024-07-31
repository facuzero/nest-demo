import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    description: 'Id generado por uuid v4',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @ApiProperty({
    description: 'Precio total de la orden',
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  total: number;

  @ApiProperty({
    description: 'Relacion con la orden',
  })
  @ManyToOne(() => Order, (order) => order.orderDetail)
  @JoinColumn()
  order: Order;

  @ApiProperty({
    description: 'Productos de la orden',
  })
  @ManyToMany(() => Product, (product) => product.orderDetails)
  @JoinTable()
  products: Product[];
}
