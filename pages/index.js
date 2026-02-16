import styled from "styled-components";
import Header from "../components/Header/Header";
import TodoContainer from "../container/TodoContainer";
import AddTodoForm from "../components/AddTodoForm/AddTodoForm";
import TodoList from "../components/TodoList/TodoList";



const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding-top: 40px;
  flex-direction: column;
  align-items: center;
`;


export default function Home() {
  return (
    <TodoContainer>
      <Header/>
      <AddTodoForm />
      <TodoList />
    </TodoContainer>
  );
}

