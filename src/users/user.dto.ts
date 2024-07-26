import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { passwordCompare } from 'src/decorators/passwordCompare.decorator';

export class CreateUserDto {
  /** Debe ser un string entre 3 y 80 caracteres
    @example 'Test user'
  */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name: string;

  /** Debe ser un email, no debe estar vacío
    @example 'Test@mail.com'
  */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /** Debe ser un string entre 8 y 15 caracteres, con mínimo 
   * una letra mayuscula, minuscula, numero y simbolo
    @example 'AAbb11##'
  */
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @IsStrongPassword({
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;

  /** Volver a ingresar el mismo password
    @example 'AAbb11##'
  */
  @IsNotEmpty()
  @Validate(passwordCompare, ['password'])
  confirmPassword: string;

  /** Debe ser un string entre 3 y 80 caracteres
    @example 'calle falsa 123'
  */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address: string;

  /** Debe ser un number y no debe estar vacío
    @example '12345678'
  */
  @IsNotEmpty()
  @IsNumber()
  phone: number;

  /** Debe ser un string, entre 5 y 20 caracteres
    @example 'Algun pais'
  */
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  country: string;

  /** Debe ser un string, entre 5 y 20 caracteres
    @example 'Alguna ciudad'
  */
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  city: string;
}

export class LoginUserDto {
  /** Un mail, no debe  estar vacio
    @example 'Test@mail.com'
  */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /** El password para loguearse
    @example 'AAbb11##'
  */
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @IsStrongPassword({
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;
}
