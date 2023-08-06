import styled from "styled-components";

export default styled.textarea`
  display: block;
  width: 100%;
  min-width: 30px;
  box-sizing: border-box;
  outline: none;
  border: none;
  background-color: #ffffff;
  color: black;
  font-size: 12px;
  height: 100%;
  border: 1px solid #d9d9d9;
  padding: 12px;
  max-width: 450px;
  min-width: 200px;
  max-height: 350px;
  min-height: 150px;
  overflow-y: scroll;
  resize: none;

  &.full-width {
    max-width: 100%;
  }
  &::placeholder {
    color: #bfbfbf;
  }
  &:hover {
    border-color: #4096ff;
  }

  &:disabled {
    background-color: #f5f5f5;
    border-color: #d9d9d9;
    resize: none;
  }

  &.has-alert {
    border-color: #ff7800;
    color: #ff7800;
  }
  &.has-error {
    border-color: #d03737;
    color: #d03737;
  }
  &.rounded-sm {
    border-radius: 4px;
  }
  &.rounded-md {
    border-radius: 8px;
  }
  &.rounded-lg {
    border-radius: 16px;
  }
`;
