import ContextTodoForm from "./ContextTodoForm";
import ContextTodoItem from "./ContextTodoItem";
import { TodosProvider, useTodosContext } from "./todosContext";

function ReactContextTodoListBody() {
  const { todos } = useTodosContext();
  return (
    <div id="wd-context-todo-list">
      <h3>Context Todo List</h3>
      <ContextTodoForm />
      <ul className="m-0 max-w-lg list-none p-0">
        {todos.map((todo) => (
          <ContextTodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default function ReactContextTodoList() {
  return (
    <TodosProvider>
      <ReactContextTodoListBody />
    </TodosProvider>
  );
}
