import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { ObjectId } from 'mongodb';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { isUserInRequest } from 'src/users/utils/user.utils';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: MongoRepository<Task>,
    private readonly usersSercie: UsersService,
  ) {}
  private async getUserFromRequest(request: Request): Promise<User> {
    if (isUserInRequest(request)) {
      const userById = await this.usersSercie.findByUsername(
        request.user.username,
      );
      return userById;
    }

    throw new UnauthorizedException('User not found in request');
  }

  async create(createTaskDto: CreateTaskDto, req: Request): Promise<Task> {
    try {
      const createdTask = await this.taskRepository.create(createTaskDto);
      const userFromRequest = await this.getUserFromRequest(req);

      createdTask.user = userFromRequest;
      const savedTask = this.taskRepository.save(createdTask);
      return savedTask;
    } catch (error) {
      console.error('Error creating task:', error);
      throw new InternalServerErrorException('Failed to create task');
    }
  }

  async findAll(req: Request): Promise<Task[]> {
    console.log('@@@');
    try {
      const userFromRequest = await this.getUserFromRequest(req);

      const tasks = await this.taskRepository.find({
        where: { user: userFromRequest },
      });
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

  async getSummary(req: Request) {
    console.log('getSummary');
    try {
      const allTasks = await this.findAll(req);
      const summary = {
        totalTasks: allTasks.length,
        completedTasks: allTasks.filter((task) => task.status === 'completed')
          .length,
        pendingTasks: allTasks.filter((task) => task.status === 'pending')
          .length,
        inProgressTasks: allTasks.filter((task) => task.status === 'inProgress')
          .length,
      };
      return summary;
    } catch (error) {
      console.error('Error get summary:', error);
      throw new InternalServerErrorException('Failed to generate summary');
    }
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    try {
      await this.taskRepository.update(new ObjectId(id), updateTaskDto);
      const updatedTask = await this.taskRepository.find({
        _id: new ObjectId(id),
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
    } catch (error) {
      console.error('Error deleting task:', error);
      throw new InternalServerErrorException('Failed to delete task');
    }
  }
}
