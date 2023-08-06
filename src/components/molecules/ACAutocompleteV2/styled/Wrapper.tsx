import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  max-width: 350px;
  width: 100%;
  height: fit-content;

  &.fullWidth {
    max-width: 100%;
  }
  svg {
    pointer-events: none;
  }
  &.mb-sm {
    margin-bottom: 8px;
  }
  &.mb-md {
    margin-bottom: 16px;
  }
  &.mb-lg {
    margin-bottom: 24px;
  }
  &.disabled {
    pointer-events: none;
  }
`;
