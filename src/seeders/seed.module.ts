import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/categories/categories.entity';
import { Product } from 'src/products/products.entity';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { Order } from 'src/orders/orders.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Product, Order])],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedsModule {}
