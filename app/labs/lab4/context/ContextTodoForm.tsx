import { useTodosContext } from "./todosContext";

export default function ContextTodoForm() {
  const { todo, setTodo, addTodo, updateTodo } = useTodosContext();
  return (
    <div id="wd-context-todo-form" className="mb-3 flex flex-wrap gap-2">
      <input
        className="rounded border border-neutral-300 px-3 py-1.5"
        value={todo.title}
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
        id="wd-context-todo-title"
      />
      <button
        type="button"
        onClick={() => addTodo(todo)}
        id="wd-context-add-todo-click"
        className="rounded bg-green-600 px-3 py-1.5 text-sm font-medium text-white"
      >
        Add
      </button>
      <button
        type="button"
        onClick={() => updateTodo(todo)}
        id="wd-context-update-todo-click"
        className="rounded bg-yellow-400 px-3 py-1.5 text-sm font-medium"
      >
        Update
      </button>
    </div>
  );
}
