import React, { useState } from 'react';
import styled from 'styled-components';
import { Task, TaskFilters, TaskCounts } 
import TaskCard 

interface TaskListProps {
  tasks;
  counts;
  loading;
  error;
  filters;
  onFiltersChange: (filters) => void;
  onCreateNew;
  onViewTask;
  onEditTask;
  onDeleteTask;
}

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 16px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const Title = styled.h1`
  font-size: 2.25rem;
  font-weight: bold;
  color: #111827;
  margin: 0;
`;

const NewButton = styled.button`
  background: #2563eb;
  color: white;
  font-weight: 600;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #1d4ed8;
  }
`;

const Alert = styled.div<{ variant: 'error' | 'info' }>`
  padding: 16px;
  margin-bottom: 24px;
  border-radius: 4px;
  border-left: 4px solid;

  ${props => props.variant === 'error' ? `
    background: #fee2e2;
    border-color: #dc2626;
    color: #991b1b;
  ` : `
    background: #dbeafe;
    border-color: #2563eb;
    color: #1e3a8a;
  `}
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
`;

const StatCard = styled.div<{ borderColor?: string }>`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 24px;
  border-left: 4px solid ${props => props.borderColor || 'transparent'};
`;

const StatTitle = styled.h5`
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0 0 8px 0;
`;

const StatValue = styled.p`
  color: #111827;
  font-size: 1.875rem;
  font-weight: bold;
  margin: 0;
`;

const FilterCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 24px;
  margin-bottom: 32px;
`;

const FilterForm = styled.form`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FilterGroup = styled.div<{ span: number }>`
  grid-column: span ${props => props.span};
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    grid-column: span 1;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;

  &:focus {
    outline: none;
    ring: 2px;
    ring-color: #2563eb;
  }
`;

const FilterButtons = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
`;

const FilterButton = styled.button<{ variant: 'primary' | 'secondary' }>`
  flex: 1;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  ${props => props.variant === 'primary' ? `
    background: #4b5563;
    color: white;
    border: none;
    &:hover { background: #374151; }
  ` : `
    background: white;
    color: #374151;
    border: 1px solid #d1d5db;
    &:hover { background: #f9fafb; }
  `}
`;

const TasksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const LoadingDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 256px;
  color: #6b7280;
  font-size: 1.125rem;
`;

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
      <Container>
        <LoadingDiv>Loading tasks...</LoadingDiv>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Tasks</Title>
        <NewButton onClick={onCreateNew}>New Task</NewButton>
      </Header>

      {error && <Alert variant="error">{error}</Alert>}

      <StatsGrid>
        <StatCard>
          <StatTitle>Total Tasks</StatTitle>
          <StatValue>{counts.total}</StatValue>
        </StatCard>
        <StatCard borderColor="#9ca3af">
          <StatTitle>Todo</StatTitle>
          <StatValue>{counts.todo}</StatValue>
        </StatCard>
        <StatCard borderColor="#fbbf24">
          <StatTitle>In Progress</StatTitle>
          <StatValue>{counts.in_progress}</StatValue>
        </StatCard>
        <StatCard borderColor="#10b981">
          <StatTitle>Done</StatTitle>
          <StatValue>{counts.done}</StatValue>
        </StatCard>
      </StatsGrid>

      <FilterCard>
        <FilterForm onSubmit={handleFilterSubmit}>
          <FilterGroup span={4}>
            <Label htmlFor="status-filter">Filter by Status</Label>
            <Select
              id="status-filter"
              value={localFilters.status}
              onChange={(e) => setLocalFilters({ ...localFilters, status: e.target.value as any })}
            >
              <option value="">All</option>
              <option value="todo">Todo</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </Select>
          </FilterGroup>
          <FilterGroup span={4}>
            <Label htmlFor="priority-filter">Filter by Priority</Label>
            <Select
              id="priority-filter"
              value={localFilters.priority}
              onChange={(e) => setLocalFilters({ ...localFilters, priority: e.target.value as any })}
            >
              <option value="">All</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Select>
          </FilterGroup>
          <FilterGroup span={4}>
            <FilterButtons>
              <FilterButton type="submit" variant="primary">Filter</FilterButton>
              <FilterButton type="button" variant="secondary" onClick={handleClearFilters}>Clear</FilterButton>
            </FilterButtons>
          </FilterGroup>
        </FilterForm>
      </FilterCard>

      {tasks.length > 0 ? (
        <TasksGrid>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onView={onViewTask}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          ))}
        </TasksGrid>
      ) : (
        <Alert variant="info">
          No tasks found. <button onClick={onCreateNew} style={{ fontWeight: 600, textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}>Create your first task</button>
        </Alert>
      )}
    </Container>
  );
};

export default TaskList;
