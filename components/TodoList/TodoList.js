import AddTodoForm from "../AddTodoForm/AddTodoForm";
import TodoItem from "../TodoItem/TodoItem";
import { Container, Title } from "./TodoList.styles";

const TodoList = ({
  todos,
  loading,
  error,
  onToggle,
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return (
      <Container>
        {/* <Title>My Todo List</Title> */}
        <p>Loading todos...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        {/* <Title>My Todo List</Title> */}
        <p style={{ color: "red" }}>{error}</p>
      </Container>
    );
  }

  return (
    <Container>
      {/* <Title>My Todo List</Title> */}

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
};

export default TodoList;
