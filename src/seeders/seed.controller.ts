import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('seeder')
@Controller('seeder')
export class SeedController {
  constructor(private readonly seederService: SeedService) {}

  @Post('categories')
  @ApiOperation({ summary: 'Cargar archivo de categorias' })
  addCategories() {
    return this.seederService.loadCategoriesData();
  }

  @Post('products')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Cargar archivo de productos' })
  addProducts() {
    return this.seederService.loadProductsData();
  }

  @Post('reset')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Borra los datos de productos y los vuelva a cargar',
  })
  @ApiResponse({ status: 200, description: 'Datos reiniciados correctamente' })
  @ApiResponse({
    status: 403,
    description:
      'No se pueden reiniciar los datos porque hay órdenes existentes',
  })
  resetData() {
    return this.seederService.resetData();
  }
}
