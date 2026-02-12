import apiClient from "../apiClient";

export const getAllTodos = () => apiClient.get("/todos");

export const addTodo = (data) => apiClient.post("/todos/add", data);

export const updateTodo = (id, payload) =>
  apiClient.put(`/todos/${id}`, payload);

export const deleteTodo = (id) =>
  apiClient.delete(`/todos/${id}`);
