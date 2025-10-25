# Rails + Slim + Tailwind

Task Management feature using:
- **Framework**: Rails 8
- **Template Engine**: Slim
- **Styling**: Tailwind CSS utility classes

## Files Created:
- `app/models/task.rb` - Task model with enums and validations
- `app/controllers/tasks_controller.rb` - Full REST controller
- `app/views/tasks/index.html.slim` - List view with filters
- `app/views/tasks/show.html.slim` - Detail view
- `app/views/tasks/new.html.slim` - New form page
- `app/views/tasks/edit.html.slim` - Edit form page
- `app/views/tasks/_form.html.slim` - Shared form partial

## Slim + Tailwind Syntax Example:
```slim
.container.mx-auto.px-4.py-8
  .flex.justify-between.items-center.mb-8
    h1.text-4xl.font-bold.text-gray-900 Tasks
    = link_to 'New Task', new_task_path, class: 'bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg'
```

## Status Badge Colors:
- Done: `px-3 py-1 text-xs font-semibold text-white bg-green-500 rounded-full` (green)
- In Progress: `px-3 py-1 text-xs font-semibold text-gray-800 bg-yellow-400 rounded-full` (yellow)
- Todo: `px-3 py-1 text-xs font-semibold text-white bg-gray-400 rounded-full` (gray)
