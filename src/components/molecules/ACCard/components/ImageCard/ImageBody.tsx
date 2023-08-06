import React from "react";
import styled from "styled-components";

const StyledBody = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  span {
    color: #177a5c;
    font-weight: 500;
  }
  h4 {
    font-weight: 900;
    font-size: 1.2rem;
  }
`;
const ImageBody = () => {
  return (
    <StyledBody>
      <span>Life Style</span>
      <h4>Use the modern rules</h4>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's.
      </p>
    </StyledBody>
  );
};

export default ImageBody;
