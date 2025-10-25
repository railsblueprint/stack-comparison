import React from 'react';

const TaskDetail = ({ task, onBack, onEdit, onDelete }) => {
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'done':
        return 'px-3 py-1 text-sm font-semibold bg-green-500 rounded-full';
      case 'in_progress':
        return 'px-3 py-1 text-sm font-semibold text-gray-800 bg-yellow-400 rounded-full';
      default:
        return 'px-3 py-1 text-sm font-semibold bg-gray-300 text-gray-800 rounded-full';
    }
  };

  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'px-4 py-2 text-base font-semibold text-white bg-red-500 rounded-lg inline-block';
      case 'medium':
        return 'px-4 py-2 text-base font-semibold text-white bg-blue-500 rounded-lg inline-block';
      default:
        return 'px-4 py-2 text-base font-semibold text-gray-800 bg-gray-200 rounded-lg inline-block';
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const formatDateTime = (date) => {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const isOverdue = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(task.dueDate);
    due.setHours(0, 0, 0, 0);
    return due < today && task.status !== 'done';
  };

  const isDueToday = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(task.dueDate);
    due.setHours(0, 0, 0, 0);
    return due.getTime() === today.getTime() && task.status !== 'done';
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-blue-600 text-white px-6 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{task.title}</h2>
            <div className="flex gap-2">
              <span className={getStatusBadgeClass(task.status)}>
                {task.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h5 className="text-gray-600 text-sm font-medium mb-2">Priority</h5>
              <span className={getPriorityBadgeClass(task.priority)}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </span>
            </div>

            <div>
              <h5 className="text-gray-600 text-sm font-medium mb-2">Due Date</h5>
              <p className="text-lg">
                {formatDate(task.dueDate)}
                {isOverdue() && (
                  <span className="ml-2 px-2 py-1 text-xs font-semibold text-white bg-red-500 rounded">
                    Overdue
                  </span>
                )}
                {isDueToday() && (
                  <span className="ml-2 px-2 py-1 text-xs font-semibold text-gray-800 bg-yellow-400 rounded">
                    Due Today
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 mb-6">
            <h5 className="text-gray-600 text-sm font-medium mb-2">Description</h5>
            {task.description ? (
              <p className="text-gray-800 text-lg leading-relaxed">{task.description}</p>
            ) : (
              <p className="text-gray-400 italic">No description provided</p>
            )}
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500">
              {task.createdAt && (
                <div>
                  <strong className="font-medium">Created:</strong> {formatDateTime(task.createdAt)}
                </div>
              )}
              {task.updatedAt && (
                <div>
                  <strong className="font-medium">Last Updated:</strong> {formatDateTime(task.updatedAt)}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 flex justify-between">
          <button
            onClick={onBack}
            className="bg-white hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 border border-gray-300 rounded-md transition"
          >
            Back to Tasks
          </button>
          <div className="flex gap-2">
            <button
              onClick={onEdit}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition"
            >
              Edit Task
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition"
            >
              Delete Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
