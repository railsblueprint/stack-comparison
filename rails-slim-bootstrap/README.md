# Rails + Slim + Bootstrap

Task Management feature using:
- **Framework**: Rails 8
- **Template Engine**: Slim
- **Styling**: Bootstrap 5 semantic classes

## Files Created:
- `app/models/task.rb` - Task model with enums and validations
- `app/controllers/tasks_controller.rb` - Full REST controller
- `app/views/tasks/index.html.slim` - List view with filters
- `app/views/tasks/show.html.slim` - Detail view
- `app/views/tasks/new.html.slim` - New form page
- `app/views/tasks/edit.html.slim` - Edit form page
- `app/views/tasks/_form.html.slim` - Shared form partial

## Slim Syntax Example:
```slim
.container.mt-4
  .row
    .col-12
      h1.display-4 Tasks
      = link_to 'New Task', new_task_path, class: 'btn btn-primary'
```

## Status Badge Colors:
- Done: `badge bg-success` (green)
- In Progress: `badge bg-warning text-dark` (yellow)
- Todo: `badge bg-secondary` (gray)
