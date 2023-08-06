import React from "react";
import styled from "styled-components";
import { ACAvatar } from "../../../../atoms";

const StyledFooter = styled.div`
  display: flex;
  gap: 10px;
  padding: 15px 0px 15px 17px;
  border-top: 1px solid #6a66662d;
`;
const ImageFooter = () => {
  return (
    <StyledFooter>
      <ACAvatar imgUrl="https://images.unsplash.com/photo-1586486942853-511cfe2c6313?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNocmlzdGlhbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60" />
      <span>
        <h6>Kristen Fisher</h6>
        <span>Sep 23, 2021</span>
      </span>
    </StyledFooter>
  );
};

export default ImageFooter;
