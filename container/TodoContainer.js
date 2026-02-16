import React, { useEffect, useState } from "react";
import AddTodoForm from "../components/AddTodoForm/AddTodoForm";
import TodoList from "../components/TodoList/TodoList";

import {
  getAllTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../lib/repositories/todoRepository";

import {
  getTodosFromStorage,
  saveTodosToStorage,
} from "../utils/localStorageHelpers";

const TodoContainer = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
  useEffect(() => {
    const storedTodos = getTodosFromStorage();

    if (storedTodos.length) {
      setTodos(storedTodos);
      setLoading(false);
      return;
    }

    const fetchTodos = async () => {
      try {
        const res = await getAllTodos();
        saveTodosToStorage(res.data.todos);
        setTodos(res.data.todos);
      } catch {
        setError("Failed to fetch todos");
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

 
  const handleAdd = async (text) => {
    const res = await addTodo({
      todo: text,
      completed: false,
      userId: 1,
    });

    const localTodo = {
      ...res.data,
      id: Date.now(),
      isLocal: true,
    };

    const updated = [...todos, localTodo];
    saveTodosToStorage(updated);
    setTodos(updated);
  };

  const handleToggle = (todo) => {
    const updatedTodos = todos.map((t) =>
      t.id === todo.id
        ? { ...t, completed: !t.completed }
        : t
    );

    saveTodosToStorage(updatedTodos);
    setTodos(updatedTodos);
  };

  const handleEdit = (id, text) => {
    const updatedTodos = todos.map((t) =>
      t.id === id ? { ...t, todo: text } : t
    );

    saveTodosToStorage(updatedTodos);
    setTodos(updatedTodos);
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((t) => t.id !== id);
    saveTodosToStorage(updatedTodos);
    setTodos(updatedTodos);
  };

 
  return React.Children.map(children, (child) => {
    if (child.type === AddTodoForm) {
      return React.cloneElement(child, {
        onAdd: handleAdd,
      });
    }

    if (child.type === TodoList) {
      return React.cloneElement(child, {
        todos,
        loading,
        error,
        onToggle: handleToggle,
        onEdit: handleEdit,
        onDelete: handleDelete,
      });
    }

    return child;
  });
};

export default TodoContainer;
