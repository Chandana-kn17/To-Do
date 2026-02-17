import React, { Component } from "react";
import { HeaderWrapper, Title } from "./Header.styles";

class Header extends Component {
  render() {
    return (
      <HeaderWrapper>
        <Title>My Todo List</Title>
      </HeaderWrapper>
    );
  }
}

export default Header;
