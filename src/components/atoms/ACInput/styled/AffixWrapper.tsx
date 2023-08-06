import styled from "styled-components";

export default styled.span`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(0, 0, 0, 0.88);
  font-weight: normal;
  font-size: 14px;
  text-align: center;
  line-height: 1;

  border: 1px solid #d9d9d9;
  padding: 4px 12px;
  height: 40px;

  &:hover {
    border-color: #4096ff;
  }

  &.large {
    height: 50px;
    font-size: 16px;
  }

  &.small {
    height: 30px;
  }

  &.is-disabled {
    background-color: #f5f5f5;
    border-color: #e0e0e0;
  }

  &.has-alert {
    border-color: #ff7800;
  }
  &.has-error {
    border-color: #d03737;
  }

  // multiline
  &.multiline {
    height: fit-content;

    textarea {
      resize: none;
      overflow: hidden;
    }
  }

  // rounded
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
