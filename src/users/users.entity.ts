import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Order } from '../orders/orders.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
@Entity({
  name: 'users',
})
export class User {
  @ApiProperty({
    description: 'Id generador por uuid v4',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @ApiProperty({
    description: 'Nombre de usuario, de longitud maxima:50',
  })
  @Column({ length: 50 })
  name: string;

  @ApiProperty({
    description: 'Email de longitud maxima:50',
  })
  @Column({ length: 50, unique: true })
  email: string;

  @ApiProperty({
    description: 'Password del usuario',
  })
  @Column()
  password: string;

  @ApiProperty({
    description: 'Telefono de tipo entero',
  })
  @Column({ type: 'int' })
  phone: number;

  @ApiProperty({
    description: 'Nombre de ciudad, de longitud maxima:50',
  })
  @Column({ length: 50 })
  country: string;

  @ApiProperty({
    description: 'Nombre de calle',
  })
  @Column()
  address: string;

  @ApiProperty({
    description: 'Nombre de ciudad, de longitud maxima:50',
  })
  @Column({ length: 50 })
  city: string;

  @ApiHideProperty()
  @Column({
    default: false,
  })
  isAdmin: boolean;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
