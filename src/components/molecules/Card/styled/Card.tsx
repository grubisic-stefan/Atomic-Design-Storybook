import styled from "styled-components";

export const StyledCard = styled.div`
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  min-width: auto;
  min-height: auto;

  position: relative;
  border-radius: 10px;
  border: 1px solid rgba(229, 231, 235);
  background-color: #fff;
  font-weight: 100;
  font-family: sans-serif;
  transition: box-shadow 0.4s ease;

  &.hoverable:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    cursor: pointer;
  }
`;
