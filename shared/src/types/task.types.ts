export interface Task {
  id: string;
  userId: string;
  categoryId?: string;
  title: string;
  description?: string;
  estimatedPomodoros: number;
  completedPomodoros: number;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
  category?: Category;
}

export interface Category {
  id: string;
  userId: string;
  name: string;
  color: string;
  createdAt: Date;
}

export interface CreateTaskRequest {
  title: string;
  description?: string;
  categoryId?: string;
  estimatedPomodoros: number;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  categoryId?: string;
  estimatedPomodoros?: number;
  completed?: boolean;
}

export interface CreateCategoryRequest {
  name: string;
  color?: string;
}

export interface UpdateCategoryRequest {
  name?: string;
  color?: string;
}