import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderDbService: OrdersService) {}
  @Post()
  addOrder(@Body() order) {
    const { id, products } = order;
    return this.orderDbService.addOrder(id, products);
  }
  @Get(':id')
  getOrder(@Param('id', ParseUUIDPipe) id: string) {
    return this.orderDbService.getOrder(id);
  }
}
