import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../categories/categories.entity';
import { OrderDetail } from '../orderDetail/orderDetails.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
@Entity({
  name: 'products',
})
export class Product {
  @ApiProperty({
    description: 'Id generador por uuid v4',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ length: 50, nullable: false })
  @ApiProperty({
    description: 'Nombre del producto',
  })
  name: string;

  @ApiProperty({
    description: 'Descripcion del producto',
  })
  @Column({ nullable: false })
  description: string;

  @ApiProperty({
    description: 'Precio del producto',
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @ApiProperty({
    description: 'Cantidad de stock del producto',
  })
  @Column({ type: 'int', nullable: false })
  stock: number;

  @ApiProperty({
    description: 'Imagen del producto',
  })
  @Column({ default: 'imagen.jpg' })
  imgUrl: string;

  @ApiProperty({
    description: 'Relacion con la categoria',
  })
  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @ApiProperty({
    description: 'Relacion con el detalle de orden de compra',
  })
  @ManyToMany(() => OrderDetail)
  @JoinTable()
  orderDetails: OrderDetail[];
}
