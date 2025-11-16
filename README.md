# Task Manager - React (Vite)

## What is included
A small intermediate-level Task Management app demonstrating:
- React Router (Home / Create / Edit)
- Forms with validation using a custom `useForm` hook
- Local state persistent in `localStorage`
- Table component with sorting, filtering, pagination, and search
- Simple, clear project structure and instructions

## Requirements (software)
- Node.js 18+ (install from https://nodejs.org/)
- npm (comes with Node) or yarn

## Quick setup
1. Extract the ZIP
2. In the project folder run:
   ```bash
   npm install
   npm run dev
   ```
3. Open http://localhost:5173 in your browser

## Build for production
```bash
npm run build
npm run preview
```

## Files of interest
- `src/main.jsx` — app entry and router setup
- `src/App.jsx` — layout and routes
- `src/pages/*.jsx` — Home, CreateTask, EditTask
- `src/components/TaskTable.jsx` — table with sorting/filtering/pagination
- `src/components/TaskForm.jsx` — form UI and validation
- `src/hooks/useForm.js` — custom hook for form state & validation
- `src/utils/storage.js` — localStorage helpers

## Notes & Explanation (short)
- Tasks are stored in `localStorage` under key `tm_tasks`.
- Each task: `{ id, title, description, priority, dueDate, completed }`
- Search, sort, filter and pagination are applied on the client side.
- The `useForm` hook centralizes form state, field changes, and validation.

If you'd like, I can extend this to include:
- Drag-and-drop ordering
- Tags & multi-filter
- Server sync (simple Express + file or SQLite)
