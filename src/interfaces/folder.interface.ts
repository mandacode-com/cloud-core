import typia, { tags } from 'typia';
import { IUserRequestBody } from './request.interface';

export interface ICreateFolderRequestBodyData {
  folderName: string & tags.Pattern<'^[a-zA-Z0-9_-]{1,255}$'>;
  parentFolderId?: bigint;
}

export interface ICreateFolderServiceInput
  extends ICreateFolderRequestBodyData {
  userId: number & tags.Type<'uint32'>;
}

export interface ICreateFolderServiceOutput {
  folderKey: string & tags.Format<'uuid'>;
}

export interface ICreateFolderRequestBody extends IUserRequestBody {
  data: ICreateFolderRequestBodyData;
}

export const validateCreateFolderRequestBody =
  typia.createValidate<ICreateFolderRequestBody>();
