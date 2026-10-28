import { useTodosContext, type Todo } from "./todosContext";

export default function ContextTodoItem({ todo }: { todo: Todo }) {
  const { setTodo, deleteTodo } = useTodosContext();
  return (
    <li
      id={`wd-context-todo-${todo.id}`}
      className="mb-1 flex items-center justify-between rounded border border-neutral-200 px-3 py-1"
    >
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={todo.done} readOnly />
        <span className={todo.done ? "line-through" : undefined}>
          {todo.title}
        </span>
      </label>
      <span className="flex gap-2">
        <button
          type="button"
          onClick={() => setTodo(todo)}
          className="rounded bg-yellow-400 px-2 py-0.5 text-sm"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => deleteTodo(todo.id)}
          className="rounded bg-red-700 px-2 py-0.5 text-sm font-medium text-white"
        >
          Delete
        </button>
      </span>
    </li>
  );
}
