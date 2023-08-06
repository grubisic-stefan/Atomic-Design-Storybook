import React, { FC, Fragment, ReactNode } from "react";
import ACButton from "../../../atoms/ACButton";
import ACPagination from "../../../molecules/ACPagination";
import { ACPaginationStyleProps } from "../../../molecules/ACPagination/ACPagination";
import ACTextField from "../../../atoms/ACTextField";
import "./ACListBase.scss";

export interface ACListItem {
  id: string;
  title: string;
  description?: string;
  titleRender?: any;
  descriptionRender?: any;
}

export interface ACListState {
  currentPage: number;
  itemsPerPage: number;
  searchQuery: string;
  sort: { field: string; type: string };
}

export interface ACListViewOptions {
  sort: boolean;
  search: boolean;
  rowsSelect: boolean;
  pagination: boolean;
}

export interface ACActionParams {
  rowData: ACListItem | ACListItem[];
  tableState: ACListState;
}

export interface ACListBaseProps {
  headerTitle: string;
  rows: ACListItem[];
  debouncedSearchQuery: string;
  allItemsCount: number;
  sort: { field: string; type: string };
  onSortChange: (sort: { field: string; type: string }) => void;
  onSearchQueryChange: (searchQuery: string) => void;
  rowsNumber: number;
  onRowsNumberChange: (rowsNumber: number) => void;
  currentPage: number;
  onCurrentPageChange: (currentNumber: number) => void;
  pagesCount: number;
  onItemClicked?: (selectedItem: ACListItem) => void;
  color?: "primary" | "secondary";
  paginationStyleProps?: ACPaginationStyleProps;
  listViewOptions?: ACListViewOptions;
  sortBy?: string[];
  headerActions?: {
    icon: ReactNode;
    title?: string;
    tooltip?: string;
    onClick: (listState: ACListState) => void;
  }[];
  actions?: {
    title?: string;
    tooltip?: string;
    icon: ReactNode;
    onClick: ({
      rowData,
      tableState,
    }: {
      rowData: ACListItem;
      tableState: ACListState;
    }) => void;
  }[];
}

export interface ACStandardListProps {
  headerTitle: string;
  onItemClicked?: (selectedItem: ACListItem) => void;
  color?: "primary" | "secondary";
  paginationStyleProps?: ACPaginationStyleProps;
  listViewOptions?: ACListViewOptions;
  headerActions?: {
    icon: ReactNode;
    onClick: (listState: ACListState) => void;
  }[];
  actions?: {
    icon: ReactNode;
    onClick: ({ rowData, tableState }: ACActionParams) => void;
  }[];
  sortBy?: string[];
}

export const ACListBase: FC<ACListBaseProps> = ({
  headerTitle,
  rows,
  color = "primary",
  allItemsCount,
  debouncedSearchQuery,
  onItemClicked,
  sort,
  onSortChange,
  onSearchQueryChange,
  rowsNumber,
  onRowsNumberChange,
  currentPage,
  onCurrentPageChange,
  pagesCount,
  paginationStyleProps,
  listViewOptions = {
    pagination: true,
    rowsSelect: true,
    search: true,
    sort: true,
  },
  headerActions,
  actions,
  sortBy = ["name", "description"],
}) => {
  const listItemTitle = (item: ACListItem) => {
    if (item.titleRender) return item.titleRender;
    return (
      <div
        className={`AC-List-Items-Item-Title AC-List-Items-Item-Title-color-${color}`}
      >
        {item.title}
      </div>
    );
  };

  const listItemDescription = (item: ACListItem) => {
    if (item.descriptionRender) return item.descriptionRender;
    if (item.description)
      return (
        <div className="AC-List-Items-Item-Description">{item.description}</div>
      );
    return null;
  };

  return (
    <div className="AC-List" data-testid="AC-List">
      <div className={`AC-List-Header AC-List-Header-color-${color}`}>
        <h2 className="AC-List-Header-Title"> {headerTitle} </h2>
        {listViewOptions?.sort && (
          <div className="AC-List-Header-Sort">
            <select
              defaultValue={""}
              onChange={(e) =>
                onSortChange({
                  field: e.target.value.split("-")[0],
                  type: e.target.value.split("-")[1],
                })
              }
            >
              <option value={""} disabled>
                Sort by
              </option>
              {sortBy.map((sortOption) => (
                <Fragment key={sortOption}>
                  <option value={`${sortOption}-asc`}>
                    Sort by {sortOption} asc
                  </option>
                  ;
                  <option value={`${sortOption}-desc`}>
                    {" "}
                    Sort by {sortOption} desc{" "}
                  </option>
                  ;
                </Fragment>
              ))}
            </select>
          </div>
        )}
        {listViewOptions?.search && (
          <ACTextField
            id="Search"
            label="Search"
            onChange={(e) => onSearchQueryChange(e.target.value)}
          />
        )}
        {headerActions && (
          <div data-testid="ACList-HeaderActions">
            {headerActions.map((action, i) => (
              <ACButton
                dataTestid={action.title}
                key={i}
                onClick={() =>
                  action.onClick({
                    currentPage,
                    itemsPerPage: rowsNumber,
                    searchQuery: debouncedSearchQuery,
                    sort,
                  })
                }
                iconButton
                style={{ boxShadow: "none" }}
                color={color}
              >
                {action.icon}
              </ACButton>
            ))}
          </div>
        )}
      </div>
      <div className="AC-List-Items" data-testid="AC-List-Items">
        {rows.map((item, i) => (
          <div
            className="AC-List-Items-Item"
            data-testid="AC-List-Items-Item"
            key={item.id + i}
          >
            <div
              className="AC-List-Items-Item-Data"
              onClick={() => {
                if (onItemClicked) onItemClicked(item);
              }}
            >
              {listItemTitle(item)}
              {listItemDescription(item)}
            </div>
            {actions && (
              <div
                data-testid="AC-List-Items-Item-Icons"
                className="AC-List-Items-Item-Icons"
              >
                {actions.map((action, i) => (
                  <ACButton
                    key={i}
                    size="large"
                    iconButton
                    variant="text"
                    color={color}
                    dataTestid={action.title}
                    onClick={() =>
                      action.onClick({
                        rowData: item,
                        tableState: {
                          currentPage,
                          itemsPerPage: rowsNumber,
                          searchQuery: debouncedSearchQuery,
                          sort,
                        },
                      })
                    }
                  >
                    {action.icon}
                  </ACButton>
                ))}
              </div>
            )}
          </div>
        ))}

        {rows && rows.length === 0 && (
          <span className="AC-List-Items-noResults"> No items found </span>
        )}
      </div>
      <div className="AC-List-Pagination">
        <div className="AC-List-Pagination-RowsSelect">
          {listViewOptions.rowsSelect && (
            <select
              defaultValue={rowsNumber}
              onChange={(e) => onRowsNumberChange(Number(e.target.value))}
            >
              <option value={5}>5 Rows</option>
              <option value={10}>10 Rows</option>
              <option value={25}>25 Rows</option>
              <option value={50}>50 Rows</option>
            </select>
          )}
          {listViewOptions.pagination && rows.length > 0 && (
            <span>
              {currentPage * rowsNumber - rowsNumber + 1} -{" "}
              {currentPage * rowsNumber > allItemsCount
                ? allItemsCount
                : currentPage * rowsNumber}{" "}
              of {allItemsCount} results
            </span>
          )}
          {allItemsCount === 0 && <span> 0 results </span>}
        </div>
        {listViewOptions.pagination && pagesCount > 0 && (
          <ACPagination
            color={color}
            {...paginationStyleProps}
            size="small"
            pagesCount={pagesCount}
            currentPage={currentPage}
            handleChange={({ selectedPage }) =>
              onCurrentPageChange(selectedPage)
            }
          />
        )}
      </div>
    </div>
  );
};
