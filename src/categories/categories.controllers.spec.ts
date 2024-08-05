import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { ProductsService } from '../products/products.service';

describe('Categories controller', () => {
  let categoriesController;
  let mockCategoriesService: CategoriesService;
  let mockProductsService: ProductsService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        { provide: CategoriesService, useValue: mockCategoriesService },
        { provide: ProductsService, useValue: mockProductsService },
      ],
    }).compile();
    categoriesController =
      module.get<CategoriesController>(CategoriesController);
  });

  it('should be defined', () => {
    expect(categoriesController).toBeDefined();
  });
});
