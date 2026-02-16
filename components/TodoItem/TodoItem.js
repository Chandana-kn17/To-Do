import React, { useState } from "react";
import {
  Item,
  EditInput,
  Text,
  EditButton,
  DeleteButton,
} from "./TodoItem.styles";

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
        <EditInput
          value={text}
          autoFocus
          onChange={(e) => setText(e.target.value)}
          onBlur={() => {
            onEdit(todo.id, text);
            setEditing(false);
          }}
        />
      ) : (
        <Text completed={todo.completed}>{todo.todo}</Text>
      )}

      {!editing && (
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
