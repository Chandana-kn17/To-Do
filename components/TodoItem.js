import React, { useState } from "react";
import styled from "styled-components";

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 10px;
  background: #f9fafb;
  border: 1px solid #eee;

  span {
    flex: 1;
    cursor: pointer;
  }

  input[type="text"] {
    flex: 1;
    padding: 6px;
    border-radius: 6px;
    border: 1px solid #ccc;
  }

  button {
    border: none;
    background: transparent;
    cursor: pointer;
    font-size: 16px;
  }

  button:hover {
    color: red;
  }
`;

const TodoItem = ({ todo, onDelete, onToggle, onEdit }) => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.todo);

  return (
    <Item>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo)}
      />

      {editing ? (
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={() => {
            onEdit(todo.id, text);
            setEditing(false);
          }}
        />
      ) : (
        <span
          style={{
            textDecoration: todo.completed ? "line-through" : "none",
            color: todo.completed ? "#9ca3af" : "#111827",
          }}
          onDoubleClick={() => setEditing(true)}
        >
          {todo.todo}
        </span>
      )}

      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </Item>
  );
};

export default TodoItem;
