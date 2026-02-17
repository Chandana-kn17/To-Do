import React, { Component } from "react";
import {
  Item,
  EditInput,
  Text,
  EditButton,
  DeleteButton,
  SaveButton,
} from "./TodoItem.styles";

class TodoItem extends Component {
  state = {
    editing: false,
    text: this.props.todo.todo,
  };

  handleSave = () => {
    const { todo, onEdit } = this.props;
    const { text } = this.state;

    if (!text.trim()) return;

    onEdit(todo.id, text);
    this.setState({ editing: false });
  };

  render() {
    const { todo, onDelete, onToggle } = this.props;
    const { editing, text } = this.state;

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
            onChange={(e) =>
              this.setState({ text: e.target.value })
            }
          />
        ) : (
          <Text completed={todo.completed}>
            {todo.todo}
          </Text>
        )}

        {editing ? (
          <SaveButton onClick={this.handleSave}>
            Save
          </SaveButton>
        ) : (
          <EditButton
            onClick={() =>
              this.setState({ editing: true })
            }
          >
            Edit
          </EditButton>
        )}

        <DeleteButton onClick={() => onDelete(todo.id)}>
          Delete
        </DeleteButton>
      </Item>
    );
  }
}

export default TodoItem;
