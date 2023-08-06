import React from "react";
import styled from "styled-components";
import { ACAvatar, ACButton } from "../../../../atoms";

const StyledFooter = styled.div`
  display: flex;
  gap: 10px;
  padding: 15px 0px 15px 17px;
  border-top: 1px solid #6a66662d;
`;
const BasicFooter = () => {
  return (
    <StyledFooter>
      <ACButton>Save</ACButton>
      <ACButton variant="outlined">Edit</ACButton>
    </StyledFooter>
  );
};

export default BasicFooter;
