import React, { useState } from 'react';
import { Task, TaskFilters, TaskCounts } from '../types/Task';
import TaskCard from './TaskCard';

interface TaskListProps {
  tasks: Task[];
  counts: TaskCounts;
  loading: boolean;
  error: string | null;
  filters: TaskFilters;
  onFiltersChange: (filters: TaskFilters) => void;
  onCreateNew: () => void;
  onViewTask: (id: string) => void;
  onEditTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  counts,
  loading,
  error,
  filters,
  onFiltersChange,
  onCreateNew,
  onViewTask,
  onEditTask,
  onDeleteTask,
}) => {
  const [localFilters, setLocalFilters] = useState<TaskFilters>(filters);

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFiltersChange(localFilters);
  };

  const handleClearFilters = () => {
    const emptyFilters = { status: '', priority: '' };
    setLocalFilters(emptyFilters);
    onFiltersChange(emptyFilters);
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="d-flex justify-content-center align-items-center" style={{ height: '256px' }}>
          <div className="text-muted fs-5">Loading tasks...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="display-4">Tasks</h1>
            <button onClick={onCreateNew} className="btn btn-primary btn-lg">
              New Task
            </button>
          </div>

          {error && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              {error}
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          )}

          {/* Stats cards */}
          <div className="row mb-4">
            <div className="col-md-3">
              <div className="card bg-light">
                <div className="card-body">
                  <h5 className="card-title">Total Tasks</h5>
                  <p className="card-text display-6">{counts.total}</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card border-secondary">
                <div className="card-body">
                  <h5 className="card-title">Todo</h5>
                  <p className="card-text display-6">{counts.todo}</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card border-warning">
                <div className="card-body">
                  <h5 className="card-title">In Progress</h5>
                  <p className="card-text display-6">{counts.in_progress}</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card border-success">
                <div className="card-body">
                  <h5 className="card-title">Done</h5>
                  <p className="card-text display-6">{counts.done}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="card mb-4">
            <div className="card-body">
              <form onSubmit={handleFilterSubmit} className="row g-3">
                <div className="col-md-4">
                  <label htmlFor="status-filter" className="form-label">
                    Filter by Status
                  </label>
                  <select
                    id="status-filter"
                    value={localFilters.status}
                    onChange={(e) => setLocalFilters({ ...localFilters, status: e.target.value as any })}
                    className="form-select"
                  >
                    <option value="">All</option>
                    <option value="todo">Todo</option>
                    <option value="in_progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label htmlFor="priority-filter" className="form-label">
                    Filter by Priority
                  </label>
                  <select
                    id="priority-filter"
                    value={localFilters.priority}
                    onChange={(e) => setLocalFilters({ ...localFilters, priority: e.target.value as any })}
                    className="form-select"
                  >
                    <option value="">All</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div className="col-md-4 d-flex align-items-end">
                  <button type="submit" className="btn btn-secondary me-2">
                    Filter
                  </button>
                  <button type="button" onClick={handleClearFilters} className="btn btn-outline-secondary">
                    Clear
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Tasks grid */}
          {tasks.length > 0 ? (
            <div className="row">
              {tasks.map((task) => (
                <div key={task.id} className="col-md-6 mb-4">
                  <TaskCard
                    task={task}
                    onView={onViewTask}
                    onEdit={onEditTask}
                    onDelete={onDeleteTask}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="alert alert-info">
              <p className="mb-0">
                No tasks found.{' '}
                <button onClick={onCreateNew} className="btn btn-link p-0 align-baseline">
                  Create your first task
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
