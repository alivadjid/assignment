import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: MongoRepository<Task>,
  ) {}
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      const createdTask = this.taskRepository.create(createTaskDto);
      const savedTask = this.taskRepository.save(createdTask);
      return savedTask;
    } catch (error) {
      console.error('Error creating task:', error);
      throw new InternalServerErrorException('Failed to create task');
    }
  }

  async findAll(): Promise<Task[]> {
    try {
      const tasks = await this.taskRepository.find();
      return tasks;
    } catch (error) {
      console.error('Error finding tasks:', error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
