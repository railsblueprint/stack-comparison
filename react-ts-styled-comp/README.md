# React + TypeScript + Styled Components

Task Management feature using:
- **Language**: TypeScript
- **Styling**: CSS-in-JS with styled-components
- **Pattern**: Component-based styling with theme

## Files Created:
- `src/types/Task.ts` - TypeScript interfaces
- `src/api/tasks.ts` - API layer with mock endpoints
- `src/hooks/useTasks.ts` - Custom hook for state management
- `src/components/TaskCard.tsx` - Styled task card component
- `src/components/TaskList.tsx` - Styled task list with filters
- `src/components/TaskDetail.tsx` - Styled detail view (to be created)
- `src/components/TaskForm.tsx` - Styled form component (to be created)

## Styling Approach:
Uses `styled-components` for CSS-in-JS:
```typescript
const Button = styled.button<{ variant: 'primary' | 'secondary' }>`
  padding: 8px 16px;
  ${props => props.variant === 'primary' ?
    'background: #2563eb; color: white;' :
    'background: white; color: #374151;'}
`;
```

## Status Badge Colors:
- Done: green (#10b981)
- In Progress: yellow (#fbbf24)
- Todo: gray (#9ca3af)
