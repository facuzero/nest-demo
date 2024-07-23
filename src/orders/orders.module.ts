import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './orders.entity';
import { OrderDetail } from 'src/orderDetail/orderDetails.entity';
import { User } from 'src/users/users.entity';
import { Product } from 'src/products/products.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrderRepository } from './orders.repsitory';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderDetail, User, Product])],
  controllers: [OrdersController],
  providers: [OrdersService, OrderRepository],
})
export class OrdersModule {}
