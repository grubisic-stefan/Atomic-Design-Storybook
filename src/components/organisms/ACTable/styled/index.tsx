import styled, { StyledComponentProps } from "styled-components";
import { color, font, size } from "../../../../utils/_globalVariables";

const { s1, s2, s3, s4, s5 } = size;

type TableScrollProps = StyledComponentProps<
  "div",
  any,
  {
    tableFooter: boolean;
  },
  never
>;

export const TableWrapper = styled.div`
  /* border: 1px solid ${color.gray200};
  box-shadow: 2px 2px ${color.gray300}; */
  position: relative;
  font-family: ${font.main};
  color: ${color.text};
`;

export const TableHeading = styled.div`
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${color.primary};
  color: white;
  border-radius: ${s2} ${s2} 0 0;
  font-family: ${font.main};
`;

export const TableScroll = styled.div<TableScrollProps>`
  overflow-x: auto;
  overflow-y: hidden;
  border: 1px solid ${color.gray};
  border-radius: ${(props) => (props.tableFooter ? "0" : `0 0 ${s2} ${s2} `)};
`;

export const TableFooter = styled.div<TableScrollProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-left: 1px solid ${color.gray};
  border-right: 1px solid ${color.gray};
  border-bottom: 1px solid ${color.gray};
  border-radius: ${(props) => (!props.tableFooter ? "0" : `0 0 ${s2} ${s2} `)};
`;

export const NoOfPageSpan = styled.span`
  font-family: ${font.main};
  font-size: ${s3};
  color: ${color.text};
  opacity: 0.7;
`;
