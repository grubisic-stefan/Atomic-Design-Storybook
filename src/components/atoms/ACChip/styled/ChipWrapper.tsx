import React, { CSSProperties } from "react";
import styled from "styled-components";

interface StyledProps {
    color: string;
    variant: string;
    size: string;
    disabled: boolean;
}

const Wrapper = styled.div.attrs<StyledProps>(props => ({
    'data-color': props.color,
    'data-size': props.size,
    'data-variant': props.variant,
    'data-disabled': props.disabled,

})) <StyledProps>`
  
  border-radius: 100px;
  display: inline-flex;
  justify-content: center;
  align-items: stretch;

.ACChip-leftIcon,
.ACChip-rightIcon,
.ACChip-label {
  padding: 2px;
  cursor: pointer;
  display: flex;
  align-items: center;
}
background-color: ${props => {
    switch(`${props.variant}-${props.color}`) {
      case 'filled-primary':
        return '#25566b';
      case 'filled-secondary':
        return '#eeff00';
      case 'filled-success':
        return '#3ac656';
      case 'filled-error':
        return '#d03737';
     case 'outlined-primary':
        return '#fff';
     case 'outlined-secondary':
         return '#fff';
    case 'outlined-success':
        return '#fff';
    case 'outlined-error':
        return '#fff';
      default:
        return '#25566b';
    }
  }};
color: ${props => {
    switch(`${props.variant}-${props.color}`) {
      case 'outlined-primary':
        return '#25566b';
      case 'outlined-secondary':
        return '#eeff00';
      case 'outlined-success':
        return '#3ac656';
      case 'outlined-error':
        return '#d03737';
     case 'filled-primary':
        return '#fff';
     case 'filled-secondary':
         return '#fff';
    case 'filled-success':
        return '#fff';
    case 'filled-error':
        return '#fff';
      default:
        return '#fff';
    }
    }};
  
  border: ${props => {
    switch(`${props.variant}-${props.color}`) {
      case 'outlined-primary':
        return '1px solid #25566b';
      case 'outlined-secondary':
        return '1px solid #eeff00';
      case 'outlined-success':
        return '1px solid #3ac656';
      case 'outlined-error':
        return '1px solid #d03737';
      default:
        return '1px solid transparent';
    }
  }};

font-size: ${props => {
    switch(props.size) {
      case 'small':
        return '14px;';
      case 'medium':
        return '16px;';
      case 'large':
        return '18px;';
      default:
        return '16px;';
    }
  }};
pointer-events:${props => props.disabled ? "none":"auto"};
user-select:${props => props.disabled ? "none":"auto"};
opacity:${props=>props.disabled ? "0.7":"1"};
  
`;

interface Props {
  dataset: {
    color: string;
    variant: string;
    disabled: boolean;
    size: string;
    testid:string
  };
  className: string;
  children: React.ReactNode;
  style?: CSSProperties;
}

export const ChipWrapper = ({
  dataset: { color, variant, disabled, size, testid },
  className,
  children,
  style,
}: Props) => (
  <Wrapper
        className={className}
        color={color}
        variant={variant}
        disabled={disabled}
        size={size}
        data-testid={testid}
        style={style}
  >
    {children}
  </Wrapper>
);
