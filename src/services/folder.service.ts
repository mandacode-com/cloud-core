import {
  ICreateFolderServiceInput,
  ICreateFolderServiceOutput,
} from './../interfaces/folder.interface';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class FolderService {
  constructor(private prisma: PrismaService) {}

  async create(
    data: ICreateFolderServiceInput,
  ): Promise<ICreateFolderServiceOutput> {
    const { folderName, parentFolderId, userId } = data;
    return this.prisma.$transaction(async (tx) => {
      const createFolder = await tx.folders
        .create({
          data: {
            folder_name: folderName,
            parent_folder_id: parentFolderId,
          },
        })
        .catch((error) => {
          if (error.code === 'P2002') {
            throw new ConflictException('Folder already exists');
          }
          throw new InternalServerErrorException('Failed to create folder');
        });
      await tx.folder_info.create({
        data: {
          folder_id: createFolder.id,
          owner_id: userId,
        },
      });
      await tx.external_access.create({
        data: {
          folder_id: createFolder.id,
        },
      });
      await tx.user_role.create({
        data: {
          folder_id: createFolder.id,
          user_id: userId,
          role: ['create', 'read', 'update', 'delete'],
        },
      });

      const output: ICreateFolderServiceOutput = {
        folderKey: createFolder.folder_key,
      };

      return output;
    });
  }
}
