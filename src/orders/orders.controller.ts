import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from 'src/auth/auth.guards';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly orderDbService: OrdersService) {}
  @UseGuards(AuthGuard)
  @Post()
  addOrder(@Body() order) {
    const { id, products } = order;
    return this.orderDbService.addOrder(id, products);
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  getOrder(@Param('id', ParseUUIDPipe) id: string) {
    return this.orderDbService.getOrder(id);
  }
}
