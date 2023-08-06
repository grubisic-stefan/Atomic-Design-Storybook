import styled from "styled-components";

export default styled.div`
  display: table;
  border-collapse: separate;
  background-color: #fff;

  &.has-alert {
    border-color: #ff7800;
  }
  &.has-error {
    border-color: #d03737;
  }
  max-width: 100%;
  width: 100%;
`;
