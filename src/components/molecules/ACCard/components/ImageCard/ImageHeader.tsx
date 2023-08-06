import React from "react";
import styled from "styled-components";

const StyledImage = styled.img`
  width: 100%;
  height: 250px;
  overflow: hidden;
  object-fit: cover;
  border-radius: 5px 5px 0px 0px;
`;
const ImageHeader = () => {
  return (
    <StyledImage
      src="https://images.unsplash.com/photo-1517174637803-6929e01b6e63?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"
      alt="card header"
    />
  );
};

export default ImageHeader;
