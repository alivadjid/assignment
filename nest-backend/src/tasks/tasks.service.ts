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
import { ObjectId } from 'mongodb';

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

  async findOne(id: string) {
    try {
      const taskById = await this.taskRepository.find({
        _id: new ObjectId(id),
      });

      return taskById;
    } catch (error) {
      console.error('Error finding task by id:', error);
      throw new InternalServerErrorException('Failed to find task by id');
    }
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    try {
      const updatedTask = await this.taskRepository.save({
        id: new ObjectId(id),
        ...updateTaskDto,
      });
      return updatedTask;
    } catch (error) {
      console.error('Error updating task:', error);
      throw new InternalServerErrorException('Failed to update task');
    }
  }

  async remove(id: string) {
    try {
      const deleted = await this.taskRepository.delete({
        id: new ObjectId(id),
      });
      if (deleted.raw.deletedCount === 0) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }
      console.log('deleted', deleted);
    } catch (error) {
      console.error('Error deleting task:', error);
      throw new InternalServerErrorException('Failed to delete task');
    }
  }
}
