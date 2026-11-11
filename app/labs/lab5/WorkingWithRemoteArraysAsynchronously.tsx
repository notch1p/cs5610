"use client";
import { useEffect, useState } from "react";
import * as client from "./client";
import { FaPencilAlt, FaPlusCircle, FaTrash } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
export default function WorkingWithRemoteArraysAsynchronously() {
  const [todos, setTodos] = useState([
    { id: 1, title: "Task 1", completed: false, description: "desc1" },
  ]);
  type Todo = (typeof todos)[number];
  const fetchTodos = async () => {
    setTodos(await client.fetchTodos());
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTodos();
  }, []);
  const removeTodo = async (todo: Todo) => {
    setTodos(await client.removeTodo(todo));
  };
  const createNewTodo = async () => {
    setTodos(await client.createNewTodo());
  };
  const postNewTodo = async () => {
    const newTodo = await client.postNewTodo({
      title: "New Posted Todo",
      completed: false,
    });
    setTodos([...todos, newTodo]);
  };
  const editTodo = (todo: Todo) => {
    setTodos(
      todos.map((t) => (t.id === todo.id ? { ...todo, editing: true } : t)),
    );
  };
  const updateTodo = async (todo: Todo) => {
    await client.updateTodo(todo);
    setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
  };
  const [errorMessage, setErrorMessage] = useState(null);
  const deleteTodo = async (todo: Todo) => {
    try {
      await client.deleteTodo(todo);
      setTodos(todos.filter((t) => t.id !== todo.id));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    }
  };
  return (
    <>
      <h4>Working with Arrays Asynchronously</h4>
      <FaPlusCircle
        onClick={createNewTodo}
        id="wd-create-todo"
        className="cursor-pointer text-green-600 inline me-1"
      />
      <FaPlusCircle
        onClick={postNewTodo}
        id="wd-post-todo"
        className="cursor-pointer text-blue-600 inline"
      />
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input type="checkbox" defaultChecked={todo.completed} />
            <span className={todo.completed ? "line-through" : ""}>
              {todo.title}
            </span>
            <FaTrash
              onClick={() => removeTodo(todo)}
              id="wd-remove-todo"
              className="ms-1 cursor-pointer text-red-600 inline"
            />
            <TiDelete
              onClick={() => deleteTodo(todo)}
              id="wd-delete-todo"
              className="ms-1 cursor-pointer text-2xl text-red-600 inline"
            />
            <FaPencilAlt
              onClick={() => editTodo(todo)}
              className="ms-1 cursor-pointer text-blue-600 inline"
            />
            <input
              type="checkbox"
              className="ms-2"

              checked={todo.completed}
              onChange={(e) =>
                updateTodo({ ...todo, completed: e.target.checked })
              }
            />
          </li>
        ))}
      </ul>
      {errorMessage && (
        <p
          id="wd-todo-error-message"
          className="rounded bg-red-100 px-3 py-2 text-red-800"
        >
          {errorMessage}
        </p>
      )}
    </>
  );
}
