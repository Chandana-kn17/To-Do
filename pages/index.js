import styled from "styled-components";

/*  Functional components (commented) */
// import Header from "../components/Header/Header";
// import TodoContainer from "../container/TodoContainer";
// import AddTodoForm from "../components/AddTodoForm/AddTodoForm";
// import TodoList from "../components/TodoList/TodoList";

/*  Class-based components */
import Header from "../class_component/components/Header/Header.class";
import TodoContainer from "../class_component/container/TodoContainer.class";
import AddTodoForm from "../class_component/components/AddTodoForm/AddTodoForm.class";
import TodoList from "../class_component/components/TodoList/TodoList.class";

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding-top: 40px;
  flex-direction: column;
  align-items: center;
`;


// export default function Home() {
//   return (
//     <TodoContainer>
//       <Header/>
//       <AddTodoForm />  
//       <TodoList />
//     </TodoContainer>
//   );
// }


export default function Home() {
  return (
    <PageWrapper>
      <TodoContainer>
        <Header />
        <AddTodoForm />
        <TodoList />
      </TodoContainer>
    </PageWrapper>
  );
}