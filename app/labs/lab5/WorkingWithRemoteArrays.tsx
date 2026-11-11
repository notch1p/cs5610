"use client";

import { useState } from "react";

export default function WorkingWithRemoteArrays() {
  const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
  const API = `${HTTP_SERVER}/lab5/todos`;
  const [todo, setTodo] = useState({
    id: "1",
    title: "Task 1",
    completed: false,
    desc: "desc1",
  });
  return (
    <>
      <h4>Array</h4>
      <div className="mb-2">
        <a
          id="wd-retrieve-todos"

          className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white"
          href={API}
        >
          Get Todos
        </a>
      </div>
      <div className="mb-2">
        <a
          id="wd-retrieve-todo-by-id"
          href={`${API}/${todo.id}`}

          className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white"
        >
          Get Todo by ID
        </a>
        <input
          id="wd-todo-id"
          className="rounded p-0.5 ms-2"
          value={todo.id}
          onChange={(e) => setTodo({ ...todo, id: e.target.value })}
        />
      </div>
      <div className="mb-2">
        <a
          id="wd-retrieve-completed-todos"
          href={`${API}?completed=true`}
          className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white"
        >
          Get Completed Todos
        </a>
      </div>
      <div className="mb-2">
        <a
          id="wd-create-todo"
          href={`${API}/create`}
          className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white"
        >
          Create Todo
        </a>
      </div>
      <div className="mb-2">
        <a
          id="wd-remove-todo"
          href={`${API}/${todo.id}/delete`}
          className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white"
        >
          Remove Todo with ID = {todo.id}
        </a>
      </div>
      <div className="mb-2">
        <a
          href={`${API}/${todo.id}/title/${todo.title}`}
          className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white"
          id="wd-update-todo-title"
        >
          Update Todo
        </a>
        <input
          value={todo.id}
          className="rounded p-0.5 ms-2"
          onChange={(e) => setTodo({ ...todo, id: e.target.value })}
        />
        <input
          value={todo.title}
          className="rounded p-0.5 ms-2"
          onChange={(e) => setTodo({ ...todo, title: e.target.value })}
        />
      </div>
      <div className="mb-2">
        <a
          href={`${API}/${todo.id}/completed/${todo.completed}`}
          className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white"
          id="wd-update-todo-checkbox"
        >
          Complete Todo ID = 1
        </a>
        <input
          type="checkbox"
          checked={todo.completed}
          className="rounded p-0.5 ms-2"
          onChange={(e) =>
            setTodo({ ...todo, completed: todo.completed ? false : true })
          }
        />
      </div>
      <div className="mb-2">
        <a
          href={`${API}/${todo.id}/description/${todo.desc}`}
          className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white"
          id="wd-update-todo-description"
        >
          Describe Todo ID = 1
        </a>
        <input
          className="rounded p-0.5 ms-2"
          defaultValue={todo.desc}
          onChange={(e) => setTodo({ ...todo, desc: e.target.value })}
        />
      </div>
    </>
  );
}
