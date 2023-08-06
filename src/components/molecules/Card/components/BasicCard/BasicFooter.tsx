import React from "react";
import styled from "styled-components";
import { Avatar, Button } from "../../../../atoms";

const StyledFooter = styled.div`
  display: flex;
  gap: 10px;
  padding: 15px 0px 15px 17px;
  border-top: 1px solid #6a66662d;
`;
const BasicFooter = () => {
  return (
    <StyledFooter>
      <Button>Save</Button>
      <Button variant="outlined">Edit</Button>
    </StyledFooter>
  );
};

export default BasicFooter;
