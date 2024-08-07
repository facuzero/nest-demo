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
import { UsersDbService } from './usersDb.service';
import { FindByEmail, UpdateUserDto } from './user.dto';
import { AuthGuard } from 'src/auth/auth.guards';
import { Roles } from 'src/decorators/rols.decorator';
import { Role } from './roles.enum';
import { RolesGuard } from './roles.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly userDbService: UsersDbService, //Para guardar datos en la DB
  ) {}

  @Get()
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Listar usuarios' })
  getUsers(@Query('page') page: number, @Query('limit') limit: number) {
    return this.userDbService.getUsers(page, limit);
  }
  @Post('email')
  /*   @UseGuards(AuthGuard)
   */
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Listar usuario por Email' })
  getByEmail(@Body() email: FindByEmail) {
    return this.userDbService.getByEmail(email);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Listar usuario por ID' })
  getById(@Param('id', ParseUUIDPipe) id: string) {
    return this.userDbService.getById(id);
  }

  /* @Post()
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() user: CreateUserDto) {
    return this.userDbService.createUser(user);
  } */

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Actualizar usuario por ID' })
  updateUser(@Param('id') id: string, @Body() fields: UpdateUserDto) {
    return this.userDbService.editUser(id, fields);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Eliminar usuario por ID' })
  deleteUser(@Param('id') id: string) {
    return this.userDbService.deleteUser(id);
  }
}
