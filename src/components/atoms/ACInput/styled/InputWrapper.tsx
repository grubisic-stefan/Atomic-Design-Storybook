import styled from "styled-components";

export default styled.div`
  position: relative;
  width: max-content;

  &.full-width {
    width: 100%;
  }

  // margin bottom
  &.mb-sm {
    margin-bottom: 8px;
  }
  &.mb-md {
    margin-bottom: 16px;
  }
  &.mb-lg {
    margin-bottom: 24px;
  }

  // alert and error
  &.has-alert {
  }
  &.has-error {
  }
`;
