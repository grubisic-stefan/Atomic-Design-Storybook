import styled from "styled-components";

export default styled.div`
  border-radius: inherit;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9;

  @keyframes rings {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .rings {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .rings div {
    box-sizing: border-box;
    position: absolute;
    width: 100%;
    height: 100%;

    border-radius: 50%;
    border: 8px solid #dfc;
    animation: rings 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  }
  .rings div:nth-child(1) {
    animation-delay: -0.4s;
  }
  .rings div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .rings div:nth-child(3) {
    animation-delay: -0.15s;
  }

  &.xs {
    width: 60px;
    height: 60px;
    .rings div {
      border-width: 8px;
    }
  }
  &.sm {
    width: 80px;
    height: 80px;
    .rings div {
      border-width: 9px;
    }
  }
  &.md {
    width: 120px;
    height: 120px;
    .rings div {
      border-width: 11px;
    }
  }
  &.lg {
    width: 140px;
    height: 140px;
    .rings div {
      border-width: 13px;
    }
  }
`;
