import { useState, useEffect, useCallback } from 'react';
import { taskApi } from '../api/tasks';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ status: '', priority: '' });

  const calculateCounts = (taskList) => {
    return {
      total: taskList.length,
      todo: taskList.filter(t => t.status === 'todo').length,
      in_progress: taskList.filter(t => t.status === 'in_progress').length,
      done: taskList.filter(t => t.status === 'done').length,
    };
  };

  const refreshTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await taskApi.getTasks(filters);
      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    refreshTasks();
  }, [refreshTasks]);

  const createTask = async (task) => {
    try {
      setError(null);
      await taskApi.createTask(task);
      await refreshTasks();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create task');
      throw err;
    }
  };

  const updateTask = async (id, task) => {
    try {
      setError(null);
      await taskApi.updateTask(id, task);
      await refreshTasks();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task');
      throw err;
    }
  };

  const deleteTask = async (id) => {
    try {
      setError(null);
      await taskApi.deleteTask(id);
      await refreshTasks();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete task');
      throw err;
    }
  };

  const counts = calculateCounts(tasks);

  return {
    tasks,
    counts,
    loading,
    error,
    filters,
    setFilters,
    refreshTasks,
    createTask,
    updateTask,
    deleteTask,
  };
};
