import { Task, TaskFilters } from '../types/Task';

const API_BASE = '/api/tasks';

export const taskApi = {
  // GET /api/tasks - List all tasks with optional filters
  async getTasks(filters?: TaskFilters): Promise<Task[]> {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.priority) params.append('priority', filters.priority);

    const url = params.toString() ? `${API_BASE}?${params}` : API_BASE;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }

    const data = await response.json();
    return data.map((task: any) => ({
      ...task,
      dueDate: new Date(task.dueDate),
      createdAt: task.createdAt ? new Date(task.createdAt) : undefined,
      updatedAt: task.updatedAt ? new Date(task.updatedAt) : undefined,
    }));
  },

  // GET /api/tasks/:id - Get single task
  async getTask(id: string): Promise<Task> {
    const response = await fetch(`${API_BASE}/${id}`);

    if (!response.ok) {
      throw new Error('Failed to fetch task');
    }

    const task = await response.json();
    return {
      ...task,
      dueDate: new Date(task.dueDate),
      createdAt: task.createdAt ? new Date(task.createdAt) : undefined,
      updatedAt: task.updatedAt ? new Date(task.updatedAt) : undefined,
    };
  },

  // POST /api/tasks - Create new task
  async createTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
    const response = await fetch(API_BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...task,
        dueDate: task.dueDate.toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create task');
    }

    const newTask = await response.json();
    return {
      ...newTask,
      dueDate: new Date(newTask.dueDate),
      createdAt: new Date(newTask.createdAt),
      updatedAt: new Date(newTask.updatedAt),
    };
  },

  // PUT /api/tasks/:id - Update task
  async updateTask(id: string, task: Partial<Omit<Task, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Task> {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...task,
        dueDate: task.dueDate ? task.dueDate.toISOString() : undefined,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to update task');
    }

    const updatedTask = await response.json();
    return {
      ...updatedTask,
      dueDate: new Date(updatedTask.dueDate),
      createdAt: new Date(updatedTask.createdAt),
      updatedAt: new Date(updatedTask.updatedAt),
    };
  },

  // DELETE /api/tasks/:id - Delete task
  async deleteTask(id: string): Promise<void> {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete task');
    }
  },
};
