import { Controller, Get, UploadedFiles, UseInterceptors,Post,Res ,Param, UploadedFile, Bind,Req, FileTypeValidator, ParseFilePipe,UseGuards} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express/multer';
import { AppService } from './app.service';
import {ApiConsumes,ApiBody} from "@nestjs/swagger";
import { FileFieldsInterceptor } from '@nestjs/platform-express/multer/interceptors';

import { AuthGuard } from '@nestjs/passport';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
  @Get()
 @UseGuards(AuthGuard("google"))
  async googleAuth(@Req() req){
  }

  @Get("auth/google/callback")
  @UseGuards(AuthGuard("google"))
  googleAuthRedirect(@Req() req){
    return this.appService.googleLogin(req);
  }
/*
  // @Post()
  // @UseInterceptors(FilesInterceptor("image"))
  // uploadFile(@UploadedFiles()file){
  //   console.log(file);
  // }
  @Post('upload')
@UseInterceptors(FileInterceptor('file'))
@Bind(UploadedFile())
uploadFile(file) {
  console.log(file);
}

  // @Get(":imgpath")
  // seeUploadFile(@Param("imgpath") image,@Res() res){
  //   return res.sendFile(image,{root:"uploads"})
  // }
*/
  // single file upload api
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes("multipart/form-data")
  @ApiBody({
     schema: {
       type: 'object',
       properties: {
         file: {
           type: 'string',
           format: 'binary',
         },
       },
     },
   })
  uploadFile(@UploadedFile(
     new ParseFilePipe({
       validators: [
        //  new MaxFileSizeValidator({ maxSize: 1000 }),
         new FileTypeValidator({ fileType: 'image/jpeg' }),
       ],
     }),
   )
   file: Express.Multer.File,) {
  return file.originalname;
  }
  // multifile file upload
  @Post('upload/many')
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes("multipart/form-data")
  @ApiBody({
     schema: {
       type: 'object',
       properties: {
         files: {
           type: 'array',
           items: {
             type: 'string',
             format: 'binary',
           },
         },
       },
     },
   })
  uploadedFiles(@UploadedFiles() files: Array<Express.Multer.File>){
    console.log(files);
  }
  // different file upload
  @Post('upload/field')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        avatar: {
          type: 'string',
          format: 'binary',
        },
        background: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'avatar', maxCount: 1 },
    { name: 'background', maxCount: 1 },
  ]))
  uploadFilesys(@UploadedFiles() files: { avatar?: Express.Multer.File[], background?: Express.Multer.File[] }) {
    console.log(files);
  }

}
