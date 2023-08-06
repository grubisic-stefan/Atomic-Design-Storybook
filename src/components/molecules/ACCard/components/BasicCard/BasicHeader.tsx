import React from "react";
import { FaCheck } from "react-icons/fa";
import styled from "styled-components";
import { ACChip } from "../../../../atoms";

const StyledHeader = styled.div`
  overflow: hidden;
  object-fit: cover;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #47454539;
  p {
    font-weight: 500;
    font-size: 1.5rem;
  }
`;
const BasicHeader = () => {
  return (
    <StyledHeader>
      <p>Card header</p>
      <ACChip
        label="Status"
        rightIcon={<FaCheck />}
        size="small"
        variant="outlined"
        style={{
          padding: "1px 4px 1px 4px",
        }}
      />
    </StyledHeader>
  );
};

export default BasicHeader;
