import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Task } from './entities/task.entity';
import { Category } from './entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Category])],
  controllers: [TasksController, CategoriesController],
  providers: [TasksService, CategoriesService],
  exports: [TasksService, CategoriesService],
})
export class TasksModule {}