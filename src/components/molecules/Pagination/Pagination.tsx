import React, { CSSProperties, FC, Fragment, useEffect, useState } from "react";
import "./Pagination.scss";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { BiFirstPage, BiLastPage } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";

const range = (start: number, stop: number, step: number) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

export interface ACPaginationProps {
  pagesCount: number;
  handleChange: (paginationState: { selectedPage: number }) => void;
  currentPage: number;
  siblingsOnEachSide?: number;
  showFirstAndLastPages?: boolean;
  size?: "small" | "medium" | "large";
  showControls?: boolean;
  color?: "primary" | "secondary";
  variant?: "text" | "outlined";
  shape?: "circular" | "rounded";
  stylePaginationWrapper?: CSSProperties;
  stylePaginationItem?: CSSProperties;
  paginationItemActiveClass?: string;
  paginationItemClass?: string;
  stylePaginationDots?: CSSProperties;
  stylePaginationBefore?: CSSProperties;
  stylePaginationAfter?: CSSProperties;
  stylePaginationFirst?: CSSProperties;
  stylePaginationLast?: CSSProperties;
}

export type ACPaginationStyleProps = Omit<
  ACPaginationProps,
  "pagesCount" | "currentPage" | "handleChange"
>;

interface ACPaginationItemProps {
  num: number;
  selectedPage: number;
  handleClick: (num: number) => void;
  color: "primary" | "secondary";
  variant: "text" | "outlined";
  shape: "circular" | "rounded";
  stylePaginationItem?: React.CSSProperties;
  paginationItemActiveClass?: string;
  paginationItemClass?: string;
  size: "small" | "medium" | "large";
}

const ACPaginationItem: FC<ACPaginationItemProps> = ({
  num,
  selectedPage,
  handleClick,
  color,
  variant,
  shape,
  stylePaginationItem,
  size,
  paginationItemActiveClass,
  paginationItemClass,
}) => {
  return (
    <li
      style={stylePaginationItem}
      className={`PaginationItem PaginationItem-size-${size} PaginationItem-shape-${shape} ${paginationItemClass} ${
        selectedPage === num
          ? `PaginationItem-selected-${color}-${variant} ${paginationItemActiveClass}`
          : ""
      }`}
      onClick={() => handleClick(num)}
    >
      {num}
    </li>
  );
};

const ACPagination = ({
  pagesCount,
  currentPage = 1,
  siblingsOnEachSide = 1,
  showFirstAndLastPages = true,
  size = "medium",
  showControls = true,
  color = "primary",
  variant = "text",
  shape = "circular",
  handleChange,
  stylePaginationWrapper,
  stylePaginationItem,
  paginationItemActiveClass,
  stylePaginationDots,
  stylePaginationBefore,
  stylePaginationAfter,
  stylePaginationFirst,
  stylePaginationLast,
}: ACPaginationProps) => {
  const [pagesNums, setPagesNums] = useState([] as number[]);

  useEffect(() => {
    // 0 = FIRST THREE DOTS ...
    // -1 = SECOND THREE DOTS ... (because of unique react keys)
    // -2 = FIRST NOTHING
    // -3 = SECOND NOTHING (IF showFirstAndLastPages IS FALSE RETURN -2 AND -3 AND RENDER NOTHING)
    // ANY OTHER NUMBER = NUMBER

    const minimum = 1 + siblingsOnEachSide * 2 + 4 + 1;
    const breakpoint = minimum / 2;

    if (pagesCount < minimum) {
      setPagesNums(range(1, pagesCount, 1));
      return;
    }

    if (range(1, breakpoint, 1).includes(currentPage)) {
      setPagesNums([...range(1, breakpoint + 1, 1), 0, pagesCount]);
    } else if (
      range(pagesCount - breakpoint + 1, pagesCount, 1).includes(currentPage)
    ) {
      setPagesNums([1, 0, ...range(pagesCount - breakpoint, pagesCount, 1)]);
    } else {
      setPagesNums([
        showFirstAndLastPages ? 1 : -2,
        0,
        ...range(
          currentPage - siblingsOnEachSide,
          currentPage + siblingsOnEachSide,
          1
        ),
        -1,
        showFirstAndLastPages ? pagesCount : -3,
      ]);
    }
  }, [currentPage, pagesCount]);

  return (
    <ul style={stylePaginationWrapper} className={`Pagination`}>
      {showControls && (
        <>
          <li
            data-testid="controlFirst"
            className={`Pagination-controlIcon PaginationItem-size-${size} PaginationItem-shape-${shape} ${
              currentPage === 1 ? "disabled" : ""
            }`}
            onClick={() => handleChange({ selectedPage: 1 })}
          >
            <BiFirstPage style={stylePaginationFirst} />
          </li>
          <li
            data-testid="controlPrev"
            className={`Pagination-controlIcon PaginationItem-size-${size} PaginationItem-shape-${shape} ${
              currentPage === 1 ? "disabled" : ""
            }`}
            onClick={() => handleChange({ selectedPage: currentPage - 1 })}
          >
            <MdNavigateBefore style={stylePaginationBefore} />
          </li>
        </>
      )}
      {pagesNums.map((num) => (
        <Fragment key={num}>
          {!range(-3, 0, 1).includes(num) && (
            <ACPaginationItem
              handleClick={() => handleChange({ selectedPage: num })}
              num={num}
              selectedPage={currentPage}
              color={color}
              variant={variant}
              shape={shape}
              stylePaginationItem={stylePaginationItem}
              size={size}
              paginationItemActiveClass={paginationItemActiveClass}
            />
          )}
          {(num === 0 || num === -1) && (
            <li className="Pagination-threeDots">
              <BsThreeDots style={stylePaginationDots} />
            </li>
          )}
        </Fragment>
      ))}

      {showControls && (
        <>
          <li
            data-testid="controlNext"
            className={`Pagination-controlIcon PaginationItem-size-${size} PaginationItem-shape-${shape} ${
              currentPage === pagesCount ? "disabled" : ""
            }`}
            onClick={() => handleChange({ selectedPage: currentPage + 1 })}
          >
            <MdNavigateNext style={stylePaginationAfter} />
          </li>
          <li
            data-testid="controlLast"
            className={`Pagination-controlIcon PaginationItem-size-${size} PaginationItem-shape-${shape} ${
              currentPage === pagesCount ? "disabled" : ""
            }`}
            onClick={() => handleChange({ selectedPage: pagesCount })}
          >
            <BiLastPage style={stylePaginationLast} />
          </li>
        </>
      )}
    </ul>
  );
};

export default ACPagination;
