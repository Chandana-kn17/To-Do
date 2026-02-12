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
  }

  input[type="text"] {
    flex: 1;
    padding: 6px;
    border-radius: 6px;
    border: 1px solid #ccc;
  }
`;

const EditButton = styled.button`
  padding: 6px 10px;
  border-radius: 6px;
  border: none;
  background: #4f46e5;
  color: white;
  font-size: 13px;
  cursor: pointer;

  &:hover {
    background: #4338ca;
  }
`;

const DeleteButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 14px;
  color: #ef4444;

  &:hover {
    color: #dc2626;
  }
`;

const TodoItem = ({ todo, onDelete, onToggle, onEdit }) => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.todo);

  return (
    <Item>
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo)}
      />

      {/* Text / Edit input */}
      {editing ? (
        <input
          value={text}
          autoFocus
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
        >
          {todo.todo}
        </span>
      )}

      {/* Edit button */}
      {!editing && (
        <EditButton onClick={() => setEditing(true)}>
          Edit
        </EditButton>
      )}

      {/* Delete button */}
      <DeleteButton onClick={() => onDelete(todo.id)}>
        Delete
      </DeleteButton>
    </Item>
  );
};

export default TodoItem;
