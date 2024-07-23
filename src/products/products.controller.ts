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
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  createProduct(@Body() product: Product) {
    return this.productsService.createProduct(product);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  updateProduct(@Param('id') id: string, @Body() fields: Product) {
    return this.productsService.editProductId(id, fields);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProductById(id);
  }

  @Post('seeder')
  @HttpCode(HttpStatus.CREATED)
  addSeeder() {
    return this.productsService.loadProductsData();
  }
}
