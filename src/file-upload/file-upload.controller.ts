import {
  Controller,
  FileTypeValidator,
  HttpCode,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file-upload.service';
import { AuthGuard } from 'src/auth/auth.guards';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('file-upload')
@ApiBearerAuth()
@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}
  @Post('uploadImage/:id')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Subir una imagen a Cloudynary' })
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @Param('id') productId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200000,
            message: 'El tamaño maximo permitido es 200kb',
          }),
          new FileTypeValidator({ fileType: /(.jpg|.jpeg|.png|.webp)/ }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.fileUploadService.uploadImage(file, productId);
  }
}
