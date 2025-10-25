# React + TypeScript + Bootstrap

Task Management feature using:
- **Language**: TypeScript
- **Styling**: Bootstrap 5 semantic classes
- **Pattern**: Component-based with Bootstrap utilities

## Files Created:
- `src/types/Task.ts` - TypeScript interfaces
- `src/api/tasks.ts` - API layer with mock endpoints
- `src/hooks/useTasks.ts` - Custom hook for state management
- `src/components/TaskCard.tsx` - Bootstrap card component
- `src/components/TaskList.tsx` - Bootstrap list with filters
- `src/components/TaskDetail.tsx` - Bootstrap detail view
- `src/components/TaskForm.tsx` - Bootstrap form component

## Styling Approach:
Uses Bootstrap semantic classes:
```typescript
<button className="btn btn-primary btn-lg">New Task</button>
<div className="card shadow-sm">
  <div className="card-header bg-primary text-white">
    <h2 className="mb-0">Task Title</h2>
  </div>
</div>
```

## Status Badge Colors:
- Done: `badge bg-success` (green)
- In Progress: `badge bg-warning text-dark` (yellow)
- Todo: `badge bg-secondary` (gray)
