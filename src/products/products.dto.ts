import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  /**  Nombre del producto
    @example 'Algun producto' 
  **/
  @IsNotEmpty()
  @IsString()
  name: string;

  /**  Descripcion del producto
    @example 'Bla bla blabla' 
  **/
  @IsNotEmpty()
  @IsString()
  description: string;

  /**  Precio del producto
    @example 100 
  **/
  @IsNotEmpty()
  @IsNumber()
  price: number;

  /**  Cantidad del producto
    @example 10
  **/
  @IsNotEmpty()
  @IsNumber()
  stock: number;

  /**  Imagen del producto
    @example 'Soy una imagen' 
  **/
  @IsString()
  imgUrl: string;

  /**  Categoria del producto
    @example 'Super categoria' 
  **/
  @IsNotEmpty()
  @IsString()
  category: string;
}
export class UpdateProductDto {
  /**  Nombre del producto
    @example 'Algun producto' 
  **/
  @IsNotEmpty()
  @IsString()
  name: string;

  /**  Descripcion del producto
    @example 'Bla bla blabla' 
  **/
  @IsNotEmpty()
  @IsString()
  description: string;

  /**  Precio del producto
    @example 100 
  **/
  @IsNotEmpty()
  @IsNumber()
  price: number;

  /**  Cantidad del producto
    @example 10
  **/
  @IsNotEmpty()
  @IsNumber()
  stock: number;

  /**  Imagen del producto
    @example 'Soy una imagen' 
  **/
  @IsString()
  imgUrl: string;
}
