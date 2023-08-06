import styled from "styled-components";

export const Dropdown = styled.div`
  width: 100%;
  margin: 0;
  padding: 8px 0;
  list-style-type: none;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin-top: 4px;
  background-color: #fff;

  position: absolute;
  top: 100%;
  left: 0;
  z-index: 100;

  input {
    margin-right: 8px;
    pointer-events: none;
  }
  svg {
    pointer-events: none;
  }
`;
