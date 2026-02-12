const TODOS_KEY = "todos";

export const getTodosFromStorage = () => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(TODOS_KEY)) || [];
};

export const saveTodosToStorage = (todos) => {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
};
