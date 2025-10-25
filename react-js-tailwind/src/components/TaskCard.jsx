import React from 'react';

const TaskCard = ({ task, onView, onEdit, onDelete }) => {
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'done':
        return 'px-3 py-1 text-xs font-semibold text-white bg-green-500 rounded-full';
      case 'in_progress':
        return 'px-3 py-1 text-xs font-semibold text-gray-800 bg-yellow-400 rounded-full';
      default:
        return 'px-3 py-1 text-xs font-semibold text-white bg-gray-400 rounded-full';
    }
  };

  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'px-3 py-1 text-xs font-semibold text-white bg-red-500 rounded-full';
      case 'medium':
        return 'px-3 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full';
      default:
        return 'px-3 py-1 text-xs font-semibold text-gray-800 bg-gray-200 rounded-full';
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h5 className="text-xl font-semibold text-gray-900">
            <button
              onClick={() => onView(task.id)}
              className="hover:text-blue-600 transition text-left"
            >
              {task.title}
            </button>
          </h5>
          <div className="flex gap-2">
            <span className={getStatusBadgeClass(task.status)}>
              {task.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </span>
            <span className={getPriorityBadgeClass(task.priority)}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
          </div>
        </div>

        <p className="text-gray-600 mb-4">{truncateText(task.description, 100)}</p>

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Due: {formatDate(task.dueDate)}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onView(task.id)}
              className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 border border-blue-600 rounded-md transition"
            >
              View
            </button>
            <button
              onClick={() => onEdit(task.id)}
              className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 border border-gray-600 rounded-md transition"
            >
              Edit
            </button>
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this task?')) {
                  onDelete(task.id);
                }
              }}
              className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 border border-red-600 rounded-md transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
