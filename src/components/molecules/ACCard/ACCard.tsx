import React, { CSSProperties, ReactElement } from "react";
import { Card } from "./styled/Card";

export type ACCardProps = {
  headerChildren?: ReactElement;
  bodyChildren?: ReactElement;
  footerChildren?: ReactElement;
  hoverable?: boolean;
  bodyClass?: string;
  headerClass?: string;
  footerClass?: string;
  dataTestiId?: string;
  style?: {
    wrapper?: CSSProperties;
    headerWrapper?: CSSProperties;
    bodyWrapper?: CSSProperties;
    footerWrapper?: CSSProperties;
  };
  className?: string;
  onClick?: () => void;
};

const ACCard = ({
  headerChildren,
  bodyChildren,
  footerChildren,
  hoverable = false,
  bodyClass = "",
  headerClass = "",
  footerClass = "",
  dataTestiId = "",
  className = "",
  onClick = () => "",
  style,
}: ACCardProps) => {
  return (
    <Card
      className={`AC-Card ${hoverable && "hoverable"} ${className}`}
      data-testid={`${dataTestiId}-AC-Card-Wrapper`}
      style={style?.wrapper}
      onClick={() => onClick()}
    >
      {headerChildren && (
        <div
          style={style?.headerWrapper}
          className={`AC-Card__Header ${headerClass}`}
          data-testid={`${dataTestiId}-AC-Card-Header`}
        >
          {headerChildren}
        </div>
      )}
      {bodyChildren && (
        <div
          style={style?.bodyWrapper}
          className={`AC-Card__Body ${bodyClass}`}
          data-testid={`${dataTestiId}-AC-Card-Body`}
        >
          {bodyChildren}
        </div>
      )}
      {footerChildren && (
        <div
          style={style?.footerWrapper}
          className={`AC-Card__Footer ${footerClass}`}
          data-testid={`${dataTestiId}-AC-Card-Footer`}
        >
          {footerChildren}
        </div>
      )}
    </Card>
  );
};

export default ACCard;
