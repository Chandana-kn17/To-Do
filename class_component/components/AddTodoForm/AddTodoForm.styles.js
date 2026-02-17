import styled from "styled-components";

export const Form = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;

  input {
    flex: 1;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #ddd;
    font-size: 14px;
  }

  button {
    padding: 10px 16px;
    border-radius: 8px;
    border: none;
    background: #4f46e5;
    color: white;
    font-weight: bold;
    cursor: pointer;
  }

  button:hover {
    background: #4338ca;
  }
`;
