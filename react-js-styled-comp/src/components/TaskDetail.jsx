import React from 'react';
import styled from 'styled-components';
import { Task } 

interface TaskDetailProps {
  task;
  onBack;
  onEdit;
  onDelete;
}

const Container = styled.div`
  max-width: 896px;
  margin: 0 auto;
  padding: 32px 16px;
`;

const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const CardHeader = styled.div`
  background: #2563eb;
  color: white;
  padding: 24px;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 6px 12px;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 9999px;

  ${props => {
    if (props.status === 'done') return 'background: #10b981;';
    if (props.status === 'in_progress') return 'background: #fbbf24; color: #1f2937;';
    return 'background: #d1d5db; color: #1f2937;';
  }}
`;

const CardBody = styled.div`
  padding: 24px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FieldGroup = styled.div``;

const FieldLabel = styled.h5`
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0 0 8px 0;
`;

const PriorityBadge = styled.span<{ priority: string }>`
  display: inline-block;
  padding: 8px 16px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;

  ${props => {
    if (props.priority === 'high') return 'background: #ef4444; color: white;';
    if (props.priority === 'medium') return 'background: #3b82f6; color: white;';
    return 'background: #e5e7eb; color: #1f2937;';
  }}
`;

const DueDateText = styled.p`
  font-size: 1.125rem;
  margin: 0;
`;

const WarningBadge = styled.span<{ variant: 'overdue' | 'due-today' }>`
  margin-left: 8px;
  padding: 4px 8px;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 4px;

  ${props => props.variant === 'overdue' ? `
    background: #dc2626;
    color: white;
  ` : `
    background: #fbbf24;
    color: #1f2937;
  `}
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 24px 0;
`;

const Section = styled.div`
  margin-bottom: 24px;
`;

const Description = styled.p`
  color: #1f2937;
  font-size: 1.125rem;
  line-height: 1.75;
  margin: 0;
`;

const EmptyDescription = styled.p`
  color: #9ca3af;
  font-style: italic;
  margin: 0;
`;

const MetadataGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  font-size: 0.875rem;
  color: #6b7280;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MetadataItem = styled.div`
  strong {
    font-weight: 500;
  }
`;

const CardFooter = styled.div`
  background: #f9fafb;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button<{ variant: 'back' | 'edit' | 'delete' }>`
  padding: 8px 16px;
  font-weight: 500;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;

  ${props => {
    if (props.variant === 'back') return `
      background: white;
      color: #374151;
      border: 1px solid #d1d5db;
      &:hover { background: #f9fafb; }
    `;
    if (props.variant === 'edit') return `
      background: #2563eb;
      color: white;
      border: none;
      &:hover { background: #1d4ed8; }
    `;
    return `
      background: #dc2626;
      color: white;
      border: none;
      &:hover { background: #b91c1c; }
    `;
  }}
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const TaskDetail = ({ task, onBack, onEdit, onDelete }) => {
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
    <Container>
      <Card>
        <CardHeader>
          <HeaderContent>
            <Title>{task.title}</Title>
            <StatusBadge status={task.status}>
              {task.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </StatusBadge>
          </HeaderContent>
        </CardHeader>

        <CardBody>
          <Grid>
            <FieldGroup>
              <FieldLabel>Priority</FieldLabel>
              <PriorityBadge priority={task.priority}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </PriorityBadge>
            </FieldGroup>

            <FieldGroup>
              <FieldLabel>Due Date</FieldLabel>
              <DueDateText>
                {formatDate(task.dueDate)}
                {isOverdue() && <WarningBadge variant="overdue">Overdue</WarningBadge>}
                {isDueToday() && <WarningBadge variant="due-today">Due Today</WarningBadge>}
              </DueDateText>
            </FieldGroup>
          </Grid>

          <Divider />

          <Section>
            <FieldLabel>Description</FieldLabel>
            {task.description ? (
              <Description>{task.description}</Description>
            ) : (
              <EmptyDescription>No description provided</EmptyDescription>
            )}
          </Section>

          <Divider />

          <MetadataGrid>
            {task.createdAt && (
              <MetadataItem>
                <strong>Created:</strong> {formatDateTime(task.createdAt)}
              </MetadataItem>
            )}
            {task.updatedAt && (
              <MetadataItem>
                <strong>Last Updated:</strong> {formatDateTime(task.updatedAt)}
              </MetadataItem>
            )}
          </MetadataGrid>
        </CardBody>

        <CardFooter>
          <Button variant="back" onClick={onBack}>Back to Tasks</Button>
          <ButtonGroup>
            <Button variant="edit" onClick={onEdit}>Edit Task</Button>
            <Button variant="delete" onClick={handleDelete}>Delete Task</Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </Container>
  );
};

export default TaskDetail;
