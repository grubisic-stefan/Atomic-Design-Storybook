import React, { CSSProperties, ReactElement } from "react";
import styled from "styled-components";

export type ACAppBarT = {
  children: ReactElement | ReactElement[];
  style?: CSSProperties;
  className?: string;
  boxShadow?: boolean;
};
interface WrapperProps {
  boxShadow?: boolean
}

const Wrapper = styled.div<WrapperProps>`
  position: fixed;
  top: 0;
  left: 0;
  padding: 16px 24px;
  background-color: rgb(37 86 107);
  width: 100%;
  z-index: 999;
  box-shadow: ${({ boxShadow }) => boxShadow ? "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)":"unset"};
`;

export default function ACAppBar({ children, style, className = "", boxShadow  }: ACAppBarT) {
  return (
    <Wrapper
      data-testid="ACAppbarRoot"
      style={ style }
      className={className}
      boxShadow={boxShadow}
    >
      {children}
    </Wrapper>
  );
}
