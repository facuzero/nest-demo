import { ApiProperty } from '@nestjs/swagger';
import { OrderDetail } from '../orderDetail/orderDetails.entity';
import { User } from '../users/users.entity';
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
  @ApiProperty({
    description: 'Id generado por uuid v4',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @ApiProperty({
    description: 'Fecha de creacion de la orden',
  })
  @Column({ nullable: false })
  date: Date;

  @ApiProperty({
    description: 'Relacion con el detalle de la orden',
  })
  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetail: OrderDetail[];

  @ApiProperty({
    description: 'Relacion con el usuario',
  })
  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn()
  user: User;
}
