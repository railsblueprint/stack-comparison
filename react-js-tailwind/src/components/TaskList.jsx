import React, { useState } from 'react';
import TaskCard from './TaskCard';

const TaskList = ({
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
  const [localFilters, setLocalFilters] = useState(filters);

  const handleFilterSubmit = (e) => {
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
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-600 text-lg">Loading tasks...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Tasks</h1>
        <button
          onClick={onCreateNew}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition"
        >
          New Task
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded" role="alert">
          <p>{error}</p>
        </div>
      )}

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h5 className="text-gray-600 text-sm font-medium">Total Tasks</h5>
          <p className="text-3xl font-bold text-gray-900 mt-2">{counts.total}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-gray-400">
          <h5 className="text-gray-600 text-sm font-medium">Todo</h5>
          <p className="text-3xl font-bold text-gray-900 mt-2">{counts.todo}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-400">
          <h5 className="text-gray-600 text-sm font-medium">In Progress</h5>
          <p className="text-3xl font-bold text-gray-900 mt-2">{counts.in_progress}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <h5 className="text-gray-600 text-sm font-medium">Done</h5>
          <p className="text-3xl font-bold text-gray-900 mt-2">{counts.done}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <form onSubmit={handleFilterSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-4">
            <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Status
            </label>
            <select
              id="status-filter"
              value={localFilters.status}
              onChange={(e) => setLocalFilters({ ...localFilters, status: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All</option>
              <option value="todo">Todo</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
          <div className="md:col-span-4">
            <label htmlFor="priority-filter" className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Priority
            </label>
            <select
              id="priority-filter"
              value={localFilters.priority}
              onChange={(e) => setLocalFilters({ ...localFilters, priority: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="md:col-span-4 flex items-end gap-2">
            <button
              type="submit"
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md transition"
            >
              Filter
            </button>
            <button
              type="button"
              onClick={handleClearFilters}
              className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 border border-gray-300 rounded-md transition"
            >
              Clear
            </button>
          </div>
        </form>
      </div>

      {/* Tasks grid */}
      {tasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onView={onViewTask}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          ))}
        </div>
      ) : (
        <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 rounded">
          <p className="mb-0">
            No tasks found.{' '}
            <button onClick={onCreateNew} className="font-semibold underline">
              Create your first task
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskList;
