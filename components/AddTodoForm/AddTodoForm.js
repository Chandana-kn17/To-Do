import React, { useState } from "react";
import { Form } from "./AddTodoForm.styles";

const AddTodoForm = ({ onAdd }) => {
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (!text.trim()) return;
    onAdd(text);
    setText("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <Form>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Add todo..."
      />
      <button onClick={handleAdd}>Add</button>
    </Form>
  );
};

export default AddTodoForm;
