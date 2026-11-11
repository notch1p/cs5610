import axios from "axios";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const ASSIGNMENT_API = `${HTTP_SERVER}/lab5/assignment`;
const TODOS_API = `${HTTP_SERVER}/lab5/todos`;
const CALC_API: (x: number, y: number, ops: string) => string = (x, y, ops) =>
  `http://127.0.0.1:3000/api/lab5/calculator?a=${x}&b=${y}&operation=${ops}`;
export const fetchTodos = async () => {
  const response = await axios.get(TODOS_API);
  return response.data;
};
export const fetchAssignment = async () => {
  const response = await axios.get(ASSIGNMENT_API);
  return response.data;
};
export const updateTitle = async (title: string) => {
  const response = await axios.get(`${ASSIGNMENT_API}/title/${title}`);
  return response.data;
};
export const fetchWelcomeMessage = async () => {
  const response = await axios.get(`${HTTP_SERVER}/lab5/welcome`);
  return response.data;
};
export const removeTodo = async (todo: { id: number }) => {
  const response = await axios.get(`${TODOS_API}/${todo.id}/delete`);
  return response.data;
};
export const createNewTodo = async () => {
  const response = await axios.get(`${TODOS_API}/create`);
  return response.data;
};
export const postNewTodo = async (todo: {
  title: string;
  completed: boolean;
}) => {
  const response = await axios.post(TODOS_API, todo);
  return response.data;
};
export const deleteTodo = async (todo: { id: number }) => {
  const response = await axios.delete(`${TODOS_API}/${todo.id}`);
  return response.data;
};
export const updateTodo = async (todo: { id: number }) => {
  const response = await axios.put(`${TODOS_API}/${todo.id}`, todo);
  return response.data;
};
export const calculate = async (a: number, b: number, op: string) => {
  const response = await axios.get(CALC_API(a, b, op));
  return response.data;
};
