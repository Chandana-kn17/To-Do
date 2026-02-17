import React, { Component } from "react";
import TodoItem from "../TodoItem/TodoItem.class";
import { Container } from "./TodoList.styles";

class TodoList extends Component {
  render() {
    const {
      todos,
      loading,
      error,
      onToggle,
      onEdit,
      onDelete,
    } = this.props;

    if (loading) {
      return (
        <Container>
          <p>Loading todos...</p>
        </Container>
      );
    }

    if (error) {
      return (
        <Container>
          <p style={{ color: "red" }}>{error}</p>
        </Container>
      );
    }

    return (
      <Container>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </Container>
    );
  }
}

export default TodoList;
