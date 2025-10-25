# Code Generation Experiments - Overview

This directory contains 10 different implementations of the same Task Management feature, demonstrating various combinations of frameworks, template engines, and styling approaches.

## Experiment Matrix

| # | Stack | Template/Lang | Styling | Folder |
|---|-------|--------------|---------|--------|
| 1 | Rails + Slim + Bootstrap | Slim | Semantic | `rails-slim-bootstrap` ✅ |
| 2 | Rails + Slim + Tailwind | Slim | Utility | `rails-slim-tailwind` ✅ |
| 3 | Rails + ERB + Bootstrap | ERB | Semantic | `rails-erb-bootstrap` ✅ |
| 4 | Rails + ERB + Tailwind | ERB | Utility | `rails-erb-tailwind` ✅ |
| 5 | React + TS + Tailwind | JSX/TSX | Utility | `react-ts-tailwind` ✅ |
| 6 | React + TS + Styled-Comp | JSX/TSX | CSS-in-JS | `react-ts-styled-comp` ✅ |
| 7 | React + TS + Bootstrap | JSX/TSX | Semantic | `react-ts-bootstrap` ✅ |
| 8 | React + JS + Tailwind | JSX | Utility | `react-js-tailwind` ✅ |
| 9 | React + JS + Styled-Comp | JSX | CSS-in-JS | `react-js-styled-comp` ✅ |
| 10 | React + JS + Bootstrap | JSX | Semantic | `react-js-bootstrap` ✅ |

## Feature Requirements

All implementations include the same Task Management feature with:

### Data Model
- **Task fields**: title, description, status, priority, dueDate
- **Status enum**: todo, in_progress, done
- **Priority enum**: low, medium, high
- **Validations**: title (3-100 chars), description (max 1000), due date required

### CRUD Operations
- **Create**: Form with validation
- **Read**: List view with filters, detail view
- **Update**: Edit form
- **Delete**: With confirmation

### UI Components
- List view with status/priority filters
- Stats cards showing task counts
- Individual task cards
- Detail view with all information
- Form with validation and error messages

### Styling Standards
- **Status badges**:
  - Done: green
  - In Progress: yellow
  - Todo: gray
- **Priority badges**:
  - High: red
  - Medium: blue
  - Low: gray/light
- Overdue/due today indicators
- Responsive layouts
- Flash messages/toasts for notifications

## Rails Implementations (4 experiments)

### Common Structure
```
app/
├── models/
│   └── task.rb               # Model with enums, validations, scopes
├── controllers/
│   └── tasks_controller.rb   # Full REST controller (7 actions)
└── views/tasks/
    ├── index.html.[slim|erb] # List with filters
    ├── show.html.[slim|erb]  # Detail view
    ├── new.html.[slim|erb]   # New form page
    ├── edit.html.[slim|erb]  # Edit form page
    └── _form.html.[slim|erb] # Shared form partial
```

### Variations
1. **Template Engine**: Slim vs ERB
   - Slim: indentation-based, concise syntax
   - ERB: HTML with embedded Ruby tags
2. **Styling**: Bootstrap vs Tailwind
   - Bootstrap: semantic classes (`card`, `btn-primary`)
   - Tailwind: utility classes (`bg-blue-600`, `rounded-lg`)

## React Implementations (6 experiments)

### Common Structure
```
src/
├── types/
│   └── Task.ts              # TypeScript interfaces (TS only)
├── api/
│   └── tasks.[ts|js]        # API layer with fetch calls
├── hooks/
│   └── useTasks.[ts|js]     # Custom hook for state
└── components/
    ├── TaskList.[tsx|jsx]   # List with filters
    ├── TaskCard.[tsx|jsx]   # Reusable card component
    ├── TaskDetail.[tsx|jsx] # Detail view
    └── TaskForm.[tsx|jsx]   # Create/edit form
```

### Variations
1. **Language**: TypeScript vs JavaScript
   - TypeScript: Type safety, interfaces, compile-time checks
   - JavaScript: No types, runtime validation
2. **Styling**: Tailwind vs Styled Components vs Bootstrap
   - Tailwind: utility classes in JSX/TSX
   - Styled Components: CSS-in-JS with template literals
   - Bootstrap: semantic classes in JSX/TSX

## Key Comparisons

### Template Engines (Rails)
**Slim**:
```slim
.container.mt-4
  h1.display-4 Tasks
  = link_to 'New Task', new_task_path, class: 'btn btn-primary'
```

**ERB**:
```erb
<div class="container mt-4">
  <h1 class="display-4">Tasks</h1>
  <%= link_to 'New Task', new_task_path, class: 'btn btn-primary' %>
</div>
```

### Styling Approaches
**Semantic (Bootstrap)**:
```html
<button class="btn btn-primary btn-lg">New Task</button>
<span class="badge bg-success">Done</span>
```

**Utility (Tailwind)**:
```html
<button class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg">
  New Task
</button>
<span class="px-3 py-1 text-xs font-semibold text-white bg-green-500 rounded-full">
  Done
</span>
```

**CSS-in-JS (Styled Components)**:
```javascript
const Button = styled.button`
  background: #2563eb;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  &:hover { background: #1d4ed8; }
`;
```

### Language Comparison (React)
**TypeScript**:
```typescript
interface Task {
  id: string;
  title: string;
  status: 'todo' | 'in_progress' | 'done';
}

const TaskCard: React.FC<{ task: Task }> = ({ task }) => {
  // Type-safe implementation
};
```

**JavaScript**:
```javascript
// Runtime validation with PropTypes or JSDoc
const TaskCard = ({ task }) => {
  // Implementation
};
```

## File Counts

### Rails Experiments (each)
- 1 Model
- 1 Controller
- 5 Views (index, show, new, edit, _form)
- **Total: 7 files per experiment**

### React Experiments (each)
- 1 Types file (TypeScript only)
- 1 API file
- 1 Hook file
- 4 Component files
- **Total: 7 files (TS) or 6 files (JS) per experiment**

## Usage Notes

Each experiment is self-contained and demonstrates:
1. Complete CRUD functionality
2. Consistent feature set across all stacks
3. Production-ready patterns (validation, error handling, loading states)
4. Proper separation of concerns
5. Framework/library best practices

These experiments can be used to:
- Compare code generation across different stacks
- Evaluate styling approaches (semantic vs utility vs CSS-in-JS)
- Assess TypeScript vs JavaScript implementations
- Analyze template engine differences (Slim vs ERB)
- Study framework patterns (Rails MVC vs React hooks)
