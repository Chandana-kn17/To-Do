import React, { Component } from "react";
import TodoContainer from "../container/TodoContainer.class";
import Header from "../components/Header/Header.class";
import AddTodoForm from "../components/AddTodoForm/AddTodoForm.class";
import TodoList from "../components/TodoList/TodoList.class";

class Home extends Component {
  render() {
    return (
      <TodoContainer>
        <Header />
        <TodoList />
        <AddTodoForm />
      </TodoContainer>
    );
  }
}

export default Home;
