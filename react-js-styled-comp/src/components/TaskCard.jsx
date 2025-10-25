import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const CardBody = styled.div`
  padding: 24px;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

const Title = styled.h5`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

const TitleButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  text-align: left;
  transition: color 0.2s;

  &:hover {
    color: #2563eb;
  }
`;

const BadgeContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const Badge = styled.span`
  padding: 4px 12px;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 9999px;

  ${props => {
    if (props.variant === 'status-done') return 'background: #10b981; color: white;';
    if (props.variant === 'status-in_progress') return 'background: #fbbf24; color: #1f2937;';
    if (props.variant === 'status-todo') return 'background: #9ca3af; color: white;';
    if (props.variant === 'priority-high') return 'background: #ef4444; color: white;';
    if (props.variant === 'priority-medium') return 'background: #3b82f6; color: white;';
    if (props.variant === 'priority-low') return 'background: #e5e7eb; color: #1f2937;';
    return '';
  }}
`;

const Description = styled.p`
  color: #4b5563;
  margin-bottom: 16px;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DueDate = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const Button = styled.button`
  padding: 4px 12px;
  font-size: 0.875rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;

  ${props => {
    if (props.variant === 'view') return `
      background: white;
      color: #2563eb;
      border: 1px solid #2563eb;
      &:hover { background: #eff6ff; }
    `;
    if (props.variant === 'edit') return `
      background: white;
      color: #4b5563;
      border: 1px solid #4b5563;
      &:hover { background: #f9fafb; }
    `;
    if (props.variant === 'delete') return `
      background: white;
      color: #dc2626;
      border: 1px solid #dc2626;
      &:hover { background: #fef2f2; }
    `;
    return '';
  }}
`;

const TaskCard = ({ task, onView, onEdit, onDelete }) => {
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <Card>
      <CardBody>
        <CardHeader>
          <Title>
            <TitleButton onClick={() => onView(task.id)}>
              {task.title}
            </TitleButton>
          </Title>
          <BadgeContainer>
            <Badge variant={`status-${task.status}`}>
              {task.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </Badge>
            <Badge variant={`priority-${task.priority}`}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </Badge>
          </BadgeContainer>
        </CardHeader>

        <Description>{truncateText(task.description, 100)}</Description>

        <CardFooter>
          <DueDate>Due: {formatDate(task.dueDate)}</DueDate>
          <ButtonGroup>
            <Button variant="view" onClick={() => onView(task.id)}>View</Button>
            <Button variant="edit" onClick={() => onEdit(task.id)}>Edit</Button>
            <Button
              variant="delete"
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this task?')) {
                  onDelete(task.id);
                }
              }}
            >
              Delete
            </Button>
          </ButtonGroup>
        </CardFooter>
      </CardBody>
    </Card>
  );
};

export default TaskCard;
