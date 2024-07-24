import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { User } from './users.entity';
import { UsersDbService } from './usersDb.service';
import { CreateUserDto } from './user.dto';
import { AuthGuard } from 'src/auth/auth.guards';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userDbService: UsersDbService, //Para guardar datos en la DB
  ) {}
  @Get()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  getUsers(@Query('page') page: number, @Query('limit') limit: number) {
    return this.userDbService.getUsers(page, limit);
  }
  @Get('email')
  /*   @UseGuards(AuthGuard)
   */
  @HttpCode(HttpStatus.OK)
  getByEmail(@Body() { email }) {
    return this.userDbService.getByEmail(email);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  getById(@Param('id', ParseUUIDPipe) id: string) {
    return this.userDbService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() user: CreateUserDto) {
    return this.userDbService.createUser(user);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  updateUser(@Param('id') id: string, @Body() fields: User) {
    return this.userDbService.editUser(id, fields);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  deleteUser(@Param('id') id: string) {
    return this.userDbService.deleteUser(id);
  }
}
