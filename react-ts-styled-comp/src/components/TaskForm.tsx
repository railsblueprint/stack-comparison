import React, { useState } from 'react';
import styled from 'styled-components';
import { Task, TaskStatus, TaskPriority } from '../types/Task';

interface TaskFormProps {
  task?: Task;
  onSubmit: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  onCancel: () => void;
}

interface FormErrors {
  title?: string;
  description?: string;
  dueDate?: string;
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

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
`;

const CardBody = styled.div`
  padding: 24px;
`;

const Form = styled.form``;

const FormGroup = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`;

const Input = styled.input<{ hasError?: boolean }>`
  width: 100%;
  padding: 10px 16px;
  border: 1px solid ${props => props.hasError ? '#dc2626' : '#d1d5db'};
  border-radius: 6px;
  font-size: 1rem;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

const TextArea = styled.textarea<{ hasError?: boolean }>`
  width: 100%;
  padding: 10px 16px;
  border: 1px solid ${props => props.hasError ? '#dc2626' : '#d1d5db'};
  border-radius: 6px;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

const Select = styled.select<{ hasError?: boolean }>`
  width: 100%;
  padding: 10px 16px;
  border: 1px solid ${props => props.hasError ? '#dc2626' : '#d1d5db'};
  border-radius: 6px;
  font-size: 1rem;
  background: white;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

const ErrorMessage = styled.p`
  color: #dc2626;
  font-size: 0.875rem;
  margin: 4px 0 0 0;
`;

const HelpText = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  margin: 4px 0 0 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background: #2563eb;
  color: white;
  font-weight: 600;
  padding: 12px 24px;
  border-radius: 6px;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 32px;

  &:hover:not(:disabled) {
    background: #1d4ed8;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CardFooter = styled.div`
  background: #f9fafb;
  padding: 16px 24px;
`;

const BackButton = styled.button`
  background: white;
  color: #374151;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #f9fafb;
  }
`;

const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [status, setStatus] = useState<TaskStatus>(task?.status || 'todo');
  const [priority, setPriority] = useState<TaskPriority>(task?.priority || 'medium');
  const [dueDate, setDueDate] = useState(
    task?.dueDate ? task.dueDate.toISOString().split('T')[0] : ''
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    } else if (title.trim().length > 100) {
      newErrors.title = 'Title must not exceed 100 characters';
    }

    if (description.length > 1000) {
      newErrors.description = 'Description must not exceed 1000 characters';
    }

    if (!dueDate) {
      newErrors.dueDate = 'Due date is required';
    } else {
      const selectedDate = new Date(dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today && !task) {
        newErrors.dueDate = 'Due date cannot be in the past';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        status,
        priority,
        dueDate: new Date(dueDate),
      });
    } catch (error) {
      console.error('Failed to submit task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTodayDateString = () => {
    return new Date().toISOString().split('T')[0];
  };

  return (
    <Container>
      <Card>
        <CardHeader>
          <Title>{task ? 'Edit Task' : 'New Task'}</Title>
        </CardHeader>

        <CardBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                hasError={!!errors.title}
                placeholder="Enter task title"
                required
              />
              {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}
              <HelpText>Enter a descriptive title for your task (3-100 characters)</HelpText>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="description">Description</Label>
              <TextArea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                hasError={!!errors.description}
                placeholder="Enter task description (optional)"
              />
              {errors.description && <ErrorMessage>{errors.description}</ErrorMessage>}
              <HelpText>Provide additional details about this task (max 1000 characters)</HelpText>
            </FormGroup>

            <Grid>
              <FormGroup>
                <Label htmlFor="status">Status</Label>
                <Select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as TaskStatus)}
                  required
                >
                  <option value="todo">Todo</option>
                  <option value="in_progress">In Progress</option>
                  <option value="done">Done</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="priority">Priority</Label>
                <Select
                  id="priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as TaskPriority)}
                  required
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </Select>
              </FormGroup>
            </Grid>

            <FormGroup>
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                type="date"
                id="dueDate"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                min={task ? undefined : getTodayDateString()}
                hasError={!!errors.dueDate}
                required
              />
              {errors.dueDate && <ErrorMessage>{errors.dueDate}</ErrorMessage>}
              <HelpText>Select when this task should be completed</HelpText>
            </FormGroup>

            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : task ? 'Update Task' : 'Create Task'}
            </SubmitButton>
          </Form>
        </CardBody>

        <CardFooter>
          <BackButton type="button" onClick={onCancel}>
            {task ? 'Back to Task' : 'Back to Tasks'}
          </BackButton>
        </CardFooter>
      </Card>
    </Container>
  );
};

export default TaskForm;
