import styled from "styled-components";

export default styled.div`
  &.ACSnackbar {
    max-width: 400px;
    position: fixed;
    border-radius: 3px;
    overflow: hidden;
    box-shadow: 1px 1px 5px #8c8c8c;
    color: white;
    display: flex;
    padding: 20px;
    gap: 10px;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
  }

  &.ACSnackbar-top-center {
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
  }

  &.ACSnackbar-top-right {
    top: 20px;
    right: 20px;
  }

  &.ACSnackbar-bottom-right {
    bottom: 20px;
    right: 20px;
  }

  &.ACSnackbar-bottom-center {
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
  }

  &.ACSnackbar-bottom-left {
    bottom: 20px;
    left: 20px;
  }

  &.ACSnackbar-top-left {
    top: 20px;
    left: 20px;
  }

  &.ACSnackbar-primary {
    background-color: #25566b;
  }

  &.ACSnackbar-secondary {
    background-color: #eeff00;
  }

  &.ACSnackbar-success {
    background-color: #3ac656;
  }

  &.ACSnackbar-error {
    background-color: #d03737;
  }
`;
