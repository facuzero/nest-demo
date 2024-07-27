import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from 'src/auth/auth.guards';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly orderDbService: OrdersService) {}
  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear una orden' })
  addOrder(@Body() order) {
    const { id, products } = order;
    return this.orderDbService.addOrder(id, products);
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Traer una orden por ID' })
  getOrder(@Param('id', ParseUUIDPipe) id: string) {
    return this.orderDbService.getOrder(id);
  }
}
