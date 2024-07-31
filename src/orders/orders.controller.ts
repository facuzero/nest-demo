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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './order.dto';
import { Roles } from 'src/decorators/rols.decorator';
import { RolesGuard } from 'src/users/roles.guard';
import { Role } from 'src/users/roles.enum';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly orderDbService: OrdersService) {}
  @Post()
  @ApiBearerAuth()
  @Roles(Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear una orden' })
  addOrder(@Body() order: CreateOrderDto) {
    return this.orderDbService.addOrder(order);
  }
  @Get(':id')
  @ApiBearerAuth()
  @Roles(Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Traer una orden por ID de ordenDetail' })
  getOrder(@Param('id', ParseUUIDPipe) id: string) {
    return this.orderDbService.getOrder(id);
  }
}
