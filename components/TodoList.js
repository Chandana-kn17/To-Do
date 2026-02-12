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
    userId: 1, // mock user
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


 const handleToggle = async (todo) => {
  let updatedTodo;

  if (todo.isLocal) {
    updatedTodo = {
      ...todo,
      completed: !todo.completed,
    };
  } else {
    try {
      const res = await updateTodo(todo.id, {
        completed: !todo.completed,
      });

      updatedTodo = {
        ...todo,
        ...res.data,
      };
    } catch {
      updatedTodo = {
        ...todo,
        completed: !todo.completed,
      };
    }
  }

  const updatedTodos = todos.map((t) =>
    t.id === todo.id ? updatedTodo : t
  );

  saveTodosToStorage(updatedTodos);
  setTodos(updatedTodos);
};


const handleEdit = async (id, text) => {
  const existingTodo = todos.find((t) => t.id === id);

  let updatedTodo;

  if (existingTodo.isLocal) {
    updatedTodo = {
      ...existingTodo,
      todo: text,
    };
  } 
  else {
    try {
      const res = await updateTodo(id, { todo: text });

      updatedTodo = {
        ...existingTodo,
        ...res.data,
      };
    } catch {
      updatedTodo = {
        ...existingTodo,
        todo: text,
      };
    }
  }

  const updatedTodos = todos.map((t) =>
    t.id === id ? updatedTodo : t
  );

  saveTodosToStorage(updatedTodos);
  setTodos(updatedTodos);
};


  const handleDelete = async (id) => {
  const todoToDelete = todos.find((t) => t.id === id);

  if (todoToDelete.isLocal) {
    const updatedTodos = todos.filter((t) => t.id !== id);
    saveTodosToStorage(updatedTodos);
    setTodos(updatedTodos);
    return;
  }

  try {
    await deleteTodo(id);
  } catch {
  
  }
  const updatedTodos = todos.filter((t) => t.id !== id);
  saveTodosToStorage(updatedTodos);
  setTodos(updatedTodos);
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
