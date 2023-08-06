import styled from "styled-components";

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  border: 1px solid rgba(49, 48, 48, 0.233);
  padding: 4px 48px 4px 4px;
  background-color: inherit;
  border-radius: 7px;

  &.disabled {
    background-color: #f5f5f5;
  }

  &.has-error {
    border: 1px solid #d03737;
  }

  &.has-alert {
    border: 1px solid #ff7800;
  }

  .ac-affix-wrapper {
    border: none;
  }

  .ac-input-wrapper {
    flex: 1;
    min-width: 15ch;
  }
  .ac-input-group-wrapper {
    width: 100%;
  }

  &.rounded-sm {
    border-radius: 4px;
  }
  &.rounded-md {
    border-radius: 8px;
  }
  &.rounded-lg {
    border-radius: 12px;
  }
`;
