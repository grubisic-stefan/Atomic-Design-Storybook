import styled from "styled-components";

export default styled.label`
  display: block;
  text-align: left;
  margin-bottom: 3px;
  font-size: 12px;
  color: #000000;

  &.has-alert {
    color: #ff7800;
  }
  &.has-error {
    color: #d03737;
  }
`;
