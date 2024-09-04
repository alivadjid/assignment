import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
  ) {}
  create(createUserDto: CreateUserDto): Promise<User> {
    console.log("@@@@@@@', createUserDto", createUserDto);
    try {
      const createdUser = this.userRepository.create(createUserDto);
      const savedUser = this.userRepository.save(createdUser);
      return savedUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await this.userRepository.find();
      return users;
    } catch (error) {
      console.error('Error finding users:', error);
    }
  }

  async findOne(id: string) {
    try {
      const userById = await this.userRepository.find({
        _id: new ObjectId(id),
      });

      return userById;
    } catch (error) {
      console.error('Error finding user by id:', error);
      throw new InternalServerErrorException('Failed to find user by id');
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = await this.userRepository.save({
        id: new ObjectId(id),
        ...updateUserDto,
      });
      return updatedUser;
    } catch (error) {
      console.error('Error updating user:', error);
      throw new InternalServerErrorException('Failed to update user');
    }
  }

  async remove(id: string) {
    try {
      const deleted = await this.userRepository.delete({
        id: new ObjectId(id),
      });
      if (deleted.raw.deletedCount === 0) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new InternalServerErrorException('Failed to delete user');
    }
  }

  async findByUsername(username: string) {
    try {
      const user = await this.userRepository.findOneBy({ username });
      console.log('user', user);
      return user;
    } catch (error) {
      console.error('Error finding user by username:', error);
      throw new InternalServerErrorException('Failed to find user by username');
    }
  }
}
