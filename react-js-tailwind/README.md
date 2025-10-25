# React + JavaScript + Tailwind

Task Management feature using:
- **Language**: JavaScript (no TypeScript)
- **Styling**: Tailwind CSS utility classes
- **Pattern**: Functional components with hooks

## Files Created:
- `src/api/tasks.js` - API layer with mock endpoints (no types)
- `src/hooks/useTasks.js` - Custom hook for state management
- `src/components/TaskCard.jsx` - Task card with Tailwind utility classes
- `src/components/TaskList.jsx` - List view with filters
- `src/components/TaskDetail.jsx` - Detail view
- `src/components/TaskForm.jsx` - Form with validation

## Styling Approach:
Uses Tailwind utility classes directly in JSX:
```javascript
<button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition">
  New Task
</button>
<div className="bg-white rounded-lg shadow-md p-6">
  <h5 className="text-xl font-semibold text-gray-900">Task Title</h5>
</div>
```

## Status Badge Colors:
- Done: `bg-green-500 text-white` (green)
- In Progress: `bg-yellow-400 text-gray-800` (yellow)
- Todo: `bg-gray-400 text-white` (gray)

## Key Differences from TypeScript version:
- No type annotations or interfaces
- PropTypes or JSDoc for documentation (optional)
- Runtime validation instead of compile-time
