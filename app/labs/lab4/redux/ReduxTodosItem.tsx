import { useDispatch } from "react-redux";
import { deleteTodo, ReduxTodo } from "./todosReducer";
import { useState } from "react";

export default function ReduxTodosItem({ todo }: { todo: ReduxTodo }) {
  const [, setTitle] = useState("Learn Mongo");
  const [, setEditingId] = useState<string | null>(null);
  const dispatch = useDispatch();
  return (
    <li
      key={todo.id}
      className="mb-1 flex items-center justify-between rounded border border-neutral-200 px-3 py-1"
    >
      <span>{todo.title}</span>
      <span className="flex gap-2">
        <button
          type="button"
          className="rounded bg-yellow-400 px-2 py-0.5 text-sm"
          onClick={() => {
            setTitle(todo.title);
            setEditingId(todo.id);
          }}
        >
          Edit
        </button>
        <button
          type="button"
          className="rounded bg-red-700 px-2 py-0.5 text-sm text-white"
          onClick={() => dispatch(deleteTodo(todo.id))}
        >
          Delete
        </button>
      </span>
    </li>
  );
}
