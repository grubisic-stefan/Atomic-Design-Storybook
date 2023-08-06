import styled from "styled-components";

export const ChipWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  font-family: sans-serif;
  font-weight: bold;

  .ACChip {
    padding: 4px 5px;
    background-color: #f3f4f6;
    color: #6f7684;
    border-radius: 10px !important;

    .ACChip-rightIcon {
      border: transparent;
      svg {
        color: #6f7684;
        font-size: 1.3rem;
        font-weight: bold;
      }
    }
  }
`;
