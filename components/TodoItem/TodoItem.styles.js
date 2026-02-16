import styled from "styled-components";

export const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 10px;
  background: #f9fafb;
  border: 1px solid #eee;
`;

export const EditInput = styled.input`
  flex: 1;
  padding: 6px;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

export const Text = styled.span`
  flex: 1;
  text-decoration: ${({ completed }) =>
    completed ? "line-through" : "none"};
  color: ${({ completed }) =>
    completed ? "#9ca3af" : "#111827"};
`;

export const EditButton = styled.button`
  padding: 6px 10px;
  border-radius: 6px;
  border: none;
  background: #4f46e5;
  color: white;
  font-size: 13px;
  cursor: pointer;

  &:hover {
    background: #4338ca;
  }
`;

export const DeleteButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 14px;
  color: #ef4444;

  &:hover {
    color: #dc2626;
  }
`;

export const SaveButton = styled.button`
  padding: 6px 10px;
  border-radius: 6px;
  border: none;
  background: #16a34a; /* green */
  color: white;
  font-size: 13px;
  cursor: pointer;

  &:hover {
    background: #15803d;
  }
`;

