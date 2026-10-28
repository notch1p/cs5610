import { createContext, ReactNode, useContext, useState } from "react";

export type Todo = {
  id: string;
  title: string;
  done: boolean;
};

type TodoContext = {
  todos: Todo[];
  todo: Todo;
  setTodo: (todo: Todo) => void;
  addTodo: (todo: Todo) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (todo: Todo) => void;
};

export const emptyTodo: Todo = {
  id: "-1",
  title: "Learn React Context",
  done: false,
};

const TodoCtx = createContext<TodoContext | null>(null);

export function TodosProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", title: "Learn HTML", done: true },
    { id: "2", title: "Learn CSS", done: true },
    { id: "3", title: "Learn JavaScript", done: false },
  ]);
  const [todo, setTodo] = useState<Todo>(emptyTodo);
  return (
    <TodoCtx.Provider
      value={{
        todos,
        todo: todo,
        setTodo,
        addTodo(todo) {
          setTodos([...todos, { ...todo, id: crypto.randomUUID() }]);
          setTodo(emptyTodo);
        },
        deleteTodo: (todo) => setTodos(todos.filter((t) => t.id !== todo)),
        updateTodo(todo) {
          setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
          setTodo(emptyTodo);
        },
      }}
    >
      {children}
    </TodoCtx.Provider>
  );
}
export function useTodosContext() {
  const v = useContext(TodoCtx);
  if (!v) throw new Error("useTodosContext must be used inside TodosProvider");
  return v;
}
