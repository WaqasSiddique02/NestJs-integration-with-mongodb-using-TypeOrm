import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    if (users.length == 0) {
      console.log("No user found");
    }
    else {
      return users;
    }
  }

  async findOne(email: string) {
    const user = this.userRepository.findOneBy({ email: email });
    return user;
  }

  async create(userDTO: CreateUserDto): Promise<User> {
    return this.userRepository.save(userDTO);
  }

  async update(email: string, updateUserDto: UpdateUserDto) {
    await this.userRepository.update({ email }, updateUserDto);
    return this.userRepository.findOneBy({ email: email });
  }

  async remove(emailA: string) {
    return await this.userRepository.delete({ email:emailA });
  }
}