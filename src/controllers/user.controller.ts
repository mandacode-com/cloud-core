import { UserService } from 'src/services/user.service';
import {
  Controller,
  Delete,
  Get,
  HttpCode,
  ParseUUIDPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserGuard } from 'src/guards/user.guard';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @HttpCode(200)
  async getUser(
    @Query('uuidKey', new ParseUUIDPipe()) uuidKey: string,
  ): Promise<string> {
    await this.userService.read(uuidKey);
    return 'User found';
  }

  @Post('enroll')
  @HttpCode(201)
  async createUser(
    @Query('uuidKey', new ParseUUIDPipe()) uuidKey: string,
  ): Promise<string> {
    await this.userService.create(uuidKey);
    return 'User created';
  }

  @Delete()
  @UseGuards(UserGuard)
  async deleteUser(
    @Query('uuidKey', new ParseUUIDPipe()) uuidKey: string,
  ): Promise<string> {
    await this.userService.delete(uuidKey);
    return 'User deleted';
  }
}
