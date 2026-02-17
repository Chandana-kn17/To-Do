import React, { Component } from "react";
import AddTodoForm from "../components/AddTodoForm/AddTodoForm.class";
import TodoList from "../components/TodoList/TodoList.class";

import {
  getAllTodos,
  addTodo,
} from "../../lib/repositories/todoRepository";

import {
  getTodosFromStorage,
  saveTodosToStorage,
} from "../../utils/localStorageHelpers";

class TodoContainer extends Component {
  state = {
    todos: [],
    loading: true,
    error: null,
  };

  componentDidMount() {
    const storedTodos = getTodosFromStorage();

    if (storedTodos.length) {
      this.setState({
        todos: storedTodos,
        loading: false,
      });
      return;
    }

    getAllTodos()
      .then((res) => {
        saveTodosToStorage(res.data.todos);
        this.setState({
          todos: res.data.todos,
          loading: false,
        });
      })
      .catch(() => {
        this.setState({
          error: "Failed to fetch todos",
          loading: false,
        });
      });
  }

  handleAdd = async (text) => {
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

    const updated = [...this.state.todos, localTodo];
    saveTodosToStorage(updated);
    this.setState({ todos: updated });
  };

  handleToggle = (todo) => {
    const updated = this.state.todos.map((t) =>
      t.id === todo.id
        ? { ...t, completed: !t.completed }
        : t
    );

    saveTodosToStorage(updated);
    this.setState({ todos: updated });
  };

  handleEdit = (id, text) => {
    const updated = this.state.todos.map((t) =>
      t.id === id ? { ...t, todo: text } : t
    );

    saveTodosToStorage(updated);
    this.setState({ todos: updated });
  };

  handleDelete = (id) => {
    const updated = this.state.todos.filter(
      (t) => t.id !== id
    );

    saveTodosToStorage(updated);
    this.setState({ todos: updated });
  };

  render() {
    const { todos, loading, error } = this.state;
    const { children } = this.props;

    return React.Children.map(children, (child) => {
      if (child.type === AddTodoForm) {
        return React.cloneElement(child, {
          onAdd: this.handleAdd,
        });
      }

      if (child.type === TodoList) {
        return React.cloneElement(child, {
          todos,
          loading,
          error,
          onToggle: this.handleToggle,
          onEdit: this.handleEdit,
          onDelete: this.handleDelete,
        });
      }

      return child;
    });
  }
}

export default TodoContainer;
