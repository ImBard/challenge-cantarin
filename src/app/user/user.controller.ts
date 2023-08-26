import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { SaveUserDto } from './dto/user-save.dto';
import { UpdateUserDto } from './dto/user-update.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @Get()
  getAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Post()
  create(@Body() body: SaveUserDto): Promise<UserEntity> {
    return this.userService.store(body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.userService.delete(id);
  }

  @Put()
  update(@Body() body: UpdateUserDto): Promise<UserEntity> {
    return this.userService.update(body);
  }
}
