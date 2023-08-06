import styled from "styled-components";

export default styled.span`
  position: relative;
  display: table-cell;
  padding: 0 12px;
  color: rgba(0, 0, 0, 0.88);
  font-weight: normal;
  font-size: 14px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.05);
  border: 1px solid #d9d9d9;
  line-height: 1;
  cursor: default;
  transition: background-color 0.3s;

  &.addon-before {
    border-right: transparent;
  }
  &.addon-after {
    border-left: transparent;
  }

  &.addon-before-clickable,
  &.addon-after-clickable {
    cursor: pointer;

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }

  // rounded
  &.rounded-sm {
    &.addon-before {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    &.addon-after {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }

  &.rounded-md {
    &.addon-before {
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
    }
    &.addon-after {
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
    }
  }

  &.rounded-lg {
    &.addon-before {
      border-top-left-radius: 16px;
      border-bottom-left-radius: 16px;
    }
    &.addon-after {
      border-top-right-radius: 16px;
      border-bottom-right-radius: 16px;
    }
  }
`;
