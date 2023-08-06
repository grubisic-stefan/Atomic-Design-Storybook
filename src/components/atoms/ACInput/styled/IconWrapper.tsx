import styled from "styled-components";

export default styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  height: 100%;

  &.ac-icon-wrapper-prefix {
    margin-right: 4px;
  }

  &.ac-icon-wrapper-suffix {
    margin-left: 4px;
  }

  .prefix-clickable,
  .suffix-clickable,
  .show-password {
    cursor: pointer;
    display: flex;
    height: 100%;
    align-items: center;
    padding: 0 4px;
    transition: transform 0.3s;

    &:hover {
      transform: scale(1.1);
    }
  }

  .show-password {
    &.hidden {
      visibility: hidden;
    }
  }

  .allow-clear {
    cursor: pointer;
    outline: none;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    transition: transform 0.3s;

    &.hidden {
      visibility: hidden;
    }

    svg {
      fill: #666;
    }

    &:hover {
      transform: scale(1.1);
      svg {
        fill: #000000;
      }
    }
  }
`;
