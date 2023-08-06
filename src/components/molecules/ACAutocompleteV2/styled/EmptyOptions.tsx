import styled from "styled-components";

export const EmptyOptions = styled.li`
  display: flex;
  align-items: center;
  padding: 6px 16px;
  text-decoration: none;
  color: inherit;
  cursor: pointer;

  &:hover {
    background-color: rgba(64, 150, 255, 0.3);
  }

  &.isSelected {
    background-color: rgba(64, 150, 255, 0.6);
  }

  &.isDisabled {
    color: rgba(0, 0, 0, 0.3);
  }

  .customRender {
    margin-right: 8px;
  }

  .customRender {
    pointer-events: none;
  }
`;
