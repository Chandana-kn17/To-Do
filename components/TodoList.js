import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AddTodoForm from "./AddTodoForm";
import TodoItem from "./TodoItem";

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

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const TodoList = () => {
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

    const updated = [...todos, res.data];
    saveTodosToStorage(updated);
    setTodos(updated);
  };

  const handleToggle = async (todo) => {
    const res = await updateTodo(todo.id, {
      completed: !todo.completed,
    });

    const updated = todos.map((t) =>
      t.id === todo.id ? res.data : t
    );

    saveTodosToStorage(updated);
    setTodos(updated);
  };

  const handleEdit = async (id, text) => {
    const res = await updateTodo(id, { todo: text });

    const updated = todos.map((t) =>
      t.id === id ? res.data : t
    );

    saveTodosToStorage(updated);
    setTodos(updated);
  };

  const handleDelete = async (id) => {
  // 1️⃣ Delete from UI + LocalStorage FIRST
  const updatedTodos = todos.filter((t) => t.id !== id);
  saveTodosToStorage(updatedTodos);
  setTodos(updatedTodos);

  // 2️⃣ Try API delete (optional, non-blocking)
  try {
    await deleteTodo(id);
  } catch (error) {
    console.warn("DummyJSON delete failed (expected for local todos)");
  }
};


  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container>
      <Title>My Todo List</Title>

      <AddTodoForm onAdd={handleAdd} />

      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={handleDelete}
          onToggle={handleToggle}
          onEdit={handleEdit}
        />
      ))}
    </Container>
  );
};

export default TodoList;
