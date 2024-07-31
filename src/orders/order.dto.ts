import { IsArray, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateOrderDto {
  /**
   * UUID de usuario
   * @example '543a36c6-f274-4653-ab6d-fc4e274d045d'
   */
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  /**
   * UUID de productos
   * @example ['2c72c319-bedc-4d13-9663-6a0ee0e5c031','4f9f2208-1fb5-40f9-8969-84cdbc1abdc5']
   */
  @IsArray()
  products: [];
}
