import styled from "styled-components";

export default styled.span`
  display: block;
  color: rgba(0, 0, 0, 0.6);
  font-size: 12px;
  line-height: 1;
  text-align: left;
  padding: 0 8px;
  margin-top: 4px;

  &.has-alert {
    color: #ff7800;
  }
  &.has-error {
    color: #d03737;
  }
`;
