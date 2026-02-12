import styled from "styled-components";
import TodoList from "../components/TodoList";

const Page = styled.div`
  min-height: 100vh;
  background: #f4f6fb;
  display: flex;
  justify-content: center;
  padding-top: 50px;
`;

export default function Home() {
  return (
    <Page>
      <TodoList />
    </Page>
  );
}
