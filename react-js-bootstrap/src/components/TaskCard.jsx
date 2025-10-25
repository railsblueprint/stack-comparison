import React from 'react';

const TaskCard = ({ task, onView, onEdit, onDelete }) => {
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'done':
        return 'badge bg-success';
      case 'in_progress':
        return 'badge bg-warning text-dark';
      default:
        return 'badge bg-secondary';
    }
  };

  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'badge bg-danger';
      case 'medium':
        return 'badge bg-info text-dark';
      default:
        return 'badge bg-light text-dark';
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id);
    }
  };

  return (
    <div className="card h-100">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <h5 className="card-title">
            <button
              onClick={() => onView(task.id)}
              className="btn btn-link p-0 text-decoration-none text-start"
            >
              {task.title}
            </button>
          </h5>
          <div className="d-flex gap-2">
            <span className={getStatusBadgeClass(task.status)}>
              {task.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </span>
            <span className={getPriorityBadgeClass(task.priority)}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
          </div>
        </div>

        <p className="card-text">{truncateText(task.description, 100)}</p>

        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted">Due: {formatDate(task.dueDate)}</small>
          <div className="btn-group" role="group">
            <button
              onClick={() => onView(task.id)}
              className="btn btn-sm btn-outline-primary"
            >
              View
            </button>
            <button
              onClick={() => onEdit(task.id)}
              className="btn btn-sm btn-outline-secondary"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="btn btn-sm btn-outline-danger"
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
