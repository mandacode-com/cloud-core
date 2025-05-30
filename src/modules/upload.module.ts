import { FileReadModule } from './file/read.module';
import { FileCreateModule } from './file/create.module';
import { FileDeleteModule } from './file/delete.module';
import { Module } from '@nestjs/common';
import { UploadController } from 'src/controllers/file/upload.controller';
import { UploadService } from 'src/services/upload.service';
import { StorageModule } from './storage/storage.module';
import { TokenModule } from './token.module';
import { MemberGuardModule } from './guard.module';

@Module({
  imports: [
    FileReadModule,
    FileCreateModule,
    FileDeleteModule,
    StorageModule,
    TokenModule,
    MemberGuardModule,
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
