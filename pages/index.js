import styled from "styled-components";
import TodoList from "../components/TodoList";

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding-top: 40px;
  background: #f3f4f6;
`;

export default function Home() {
  return (
    <PageWrapper>
      <TodoList />
    </PageWrapper>
  );
}
