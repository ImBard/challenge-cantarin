import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { SaveUserDto } from './dto/user-save.dto';
import { UpdateUserDto } from './dto/user-update.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) { }

  async store(data: SaveUserDto): Promise<UserEntity> {
    const user = this.userRepository.create(data);
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async update(data: UpdateUserDto): Promise<UserEntity> {
    return await this.userRepository.save(data)
  }

  async delete(id: string): Promise<void> {
    const user = await this.userRepository.find({ where: { id: id } })
    if (user) {
      this.userRepository.remove(user);
    }
  }
}


