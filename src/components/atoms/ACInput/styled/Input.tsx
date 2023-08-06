import styled from "styled-components";

export default styled.input`
  display: block;
  width: 100%;
  min-width: 30px;
  box-sizing: border-box;
  outline: none;
  border: none;
  background-color: #ffffff;
  color: black;
  font-size: 14px;
  height: 100%;

  &::placeholder {
    color: #bfbfbf;
  }

  &:disabled {
    background-color: #f5f5f5;
  }
`;
