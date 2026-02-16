import React, { useState } from "react";
import {
  Item,
  EditInput,
  Text,
  EditButton,
  DeleteButton,
  SaveButton,   // ✅ NEW
} from "./TodoItem.styles";

const TodoItem = ({ todo, onDelete, onToggle, onEdit }) => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.todo);

  const handleSave = () => {
    if (!text.trim()) return;
    onEdit(todo.id, text);
    setEditing(false);
  };

  return (
    <Item>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo)}
      />

      {editing ? (
        <EditInput
          value={text}
          autoFocus
          onChange={(e) => setText(e.target.value)}
        />
      ) : (
        <Text completed={todo.completed}>{todo.todo}</Text>
      )}

      {/* Edit / Save toggle */}
      {editing ? (
        <SaveButton onClick={handleSave}>
          Save
        </SaveButton>
      ) : (
        <EditButton onClick={() => setEditing(true)}>
          Edit
        </EditButton>
      )}

      <DeleteButton onClick={() => onDelete(todo.id)}>
        Delete
      </DeleteButton>
    </Item>
  );
};

export default TodoItem;
