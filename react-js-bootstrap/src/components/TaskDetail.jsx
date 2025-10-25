import React from 'react';
import { Task } 

interface TaskDetailProps {
  task;
  onBack;
  onEdit;
  onDelete;
}

const TaskDetail = ({ task, onBack, onEdit, onDelete }) => {
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'done':
        return 'badge bg-success fs-6';
      case 'in_progress':
        return 'badge bg-warning text-dark fs-6';
      default:
        return 'badge bg-light text-dark fs-6';
    }
  };

  const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'badge bg-danger fs-5';
      case 'medium':
        return 'badge bg-info text-dark fs-5';
      default:
        return 'badge bg-light text-dark fs-5';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const formatDateTime = (date: Date) => {
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
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="mb-0">{task.title}</h2>
                <span className={getStatusBadgeClass(task.status)}>
                  {task.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </span>
              </div>
            </div>

            <div className="card-body">
              <div className="row mb-4">
                <div className="col-md-6">
                  <h5 className="text-muted">Priority</h5>
                  <span className={getPriorityBadgeClass(task.priority)}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </span>
                </div>

                <div className="col-md-6">
                  <h5 className="text-muted">Due Date</h5>
                  <p className="fs-5 mb-0">
                    {formatDate(task.dueDate)}
                    {isOverdue() && (
                      <span className="badge bg-danger ms-2">Overdue</span>
                    )}
                    {isDueToday() && (
                      <span className="badge bg-warning text-dark ms-2">Due Today</span>
                    )}
                  </p>
                </div>
              </div>

              <hr />

              <div className="mb-4">
                <h5 className="text-muted">Description</h5>
                {task.description ? (
                  <p className="lead">{task.description}</p>
                ) : (
                  <p className="text-muted fst-italic">No description provided</p>
                )}
              </div>

              <hr />

              <div className="row mb-3">
                {task.createdAt && (
                  <div className="col-md-6">
                    <small className="text-muted">
                      <strong>Created:</strong> {formatDateTime(task.createdAt)}
                    </small>
                  </div>
                )}
                {task.updatedAt && (
                  <div className="col-md-6">
                    <small className="text-muted">
                      <strong>Last Updated:</strong> {formatDateTime(task.updatedAt)}
                    </small>
                  </div>
                )}
              </div>
            </div>

            <div className="card-footer bg-light">
              <div className="d-flex justify-content-between">
                <button onClick={onBack} className="btn btn-outline-secondary">
                  Back to Tasks
                </button>
                <div className="btn-group">
                  <button onClick={onEdit} className="btn btn-primary">
                    Edit Task
                  </button>
                  <button onClick={handleDelete} className="btn btn-danger">
                    Delete Task
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
