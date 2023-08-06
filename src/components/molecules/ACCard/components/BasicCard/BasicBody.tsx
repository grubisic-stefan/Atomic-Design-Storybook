import React from "react";
import styled from "styled-components";

const StyledBody = styled.div`
  padding: 25px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  h4 {
    font-weight: 300;
    text-decoration: underline;
    font-size: 1.1rem;
  }
`;
const BasicBody = () => {
  return (
    <StyledBody>
      <h4>Header content</h4>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's.
      </p>
    </StyledBody>
  );
};

export default BasicBody;
