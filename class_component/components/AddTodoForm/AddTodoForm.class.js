import React, { Component } from "react";
import { Form } from "./AddTodoForm.styles";

class AddTodoForm extends Component {
  state = {
    text: "",
  };

  handleAdd = () => {
    const { text } = this.state;
    if (!text.trim()) return;

    this.props.onAdd(text);
    this.setState({ text: "" });
  };

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.handleAdd();
    }
  };

  render() {
    return (
      <Form>
        <input
          value={this.state.text}
          onChange={(e) =>
            this.setState({ text: e.target.value })
          }
          onKeyDown={this.handleKeyPress}
          placeholder="Add todo..."
        />
        <button onClick={this.handleAdd}>Add</button>
      </Form>
    );
  }
}

export default AddTodoForm;
