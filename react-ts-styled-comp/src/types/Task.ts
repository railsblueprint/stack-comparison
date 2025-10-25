export type TaskStatus = 'todo' | 'in_progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TaskFilters {
  status?: TaskStatus | '';
  priority?: TaskPriority | '';
}

export interface TaskCounts {
  total: number;
  todo: number;
  in_progress: number;
  done: number;
}
