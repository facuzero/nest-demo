import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/products/products.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
@Entity({
  name: 'categories',
})
export class Category {
  @ApiProperty({
    description: 'Id generador por uuid v4',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @ApiProperty({
    description: 'Nombre de la categoría',
  })
  @Column({ length: 50, nullable: false })
  name: string;

  @ApiProperty({
    description: 'Relacion con el producto',
  })
  @OneToMany(() => Product, (product) => product.category)
  @JoinColumn()
  products: Product[];
}
