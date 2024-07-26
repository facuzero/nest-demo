import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './products.entity';
import { AuthGuard } from 'src/auth/auth.guards';
import { Roles } from 'src/decorators/rols.decorator';
import { Role } from 'src/users/roles.enum';
import { RolesGuard } from 'src/users/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  getProducts() {
    return this.productsService.getProducts();
  }
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getProductById(@Param('id') id: string) {
    return this.productsService.getProductById(id);
  }
  @Post()
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  createProduct(@Body() product: Product) {
    return this.productsService.createProduct(product);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  updateProduct(@Param('id') id: string, @Body() fields: Product) {
    return this.productsService.editProductId(id, fields);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProductById(id);
  }

  @Post('seeder')
  @HttpCode(HttpStatus.CREATED)
  addSeeder() {
    return this.productsService.loadProductsData();
  }
}
