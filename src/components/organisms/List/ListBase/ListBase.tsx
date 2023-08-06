import React, { FC, Fragment, ReactNode } from "react";
import Button from "../../../atoms/Button";
import ACPagination from "../../../molecules/Pagination";
import { ACPaginationStyleProps } from "../../../molecules/Pagination/Pagination";
import TextField from "../../../atoms/TextField";
import "./ListBase.scss";

export interface ListItem {
  id: string;
  title: string;
  description?: string;
  titleRender?: any;
  descriptionRender?: any;
}

export interface ListState {
  currentPage: number;
  itemsPerPage: number;
  searchQuery: string;
  sort: { field: string; type: string };
}

export interface ListViewOptions {
  sort: boolean;
  search: boolean;
  rowsSelect: boolean;
  pagination: boolean;
}

export interface ActionParams {
  rowData: ListItem | ListItem[];
  tableState: ListState;
}

export interface ListBaseProps {
  headerTitle: string;
  rows: ListItem[];
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
  onItemClicked?: (selectedItem: ListItem) => void;
  color?: "primary" | "secondary";
  paginationStyleProps?: ACPaginationStyleProps;
  listViewOptions?: ListViewOptions;
  sortBy?: string[];
  headerActions?: {
    icon: ReactNode;
    title?: string;
    tooltip?: string;
    onClick: (listState: ListState) => void;
  }[];
  actions?: {
    title?: string;
    tooltip?: string;
    icon: ReactNode;
    onClick: ({
      rowData,
      tableState,
    }: {
      rowData: ListItem;
      tableState: ListState;
    }) => void;
  }[];
}

export interface StandardListProps {
  headerTitle: string;
  onItemClicked?: (selectedItem: ListItem) => void;
  color?: "primary" | "secondary";
  paginationStyleProps?: ACPaginationStyleProps;
  listViewOptions?: ListViewOptions;
  headerActions?: {
    icon: ReactNode;
    onClick: (listState: ListState) => void;
  }[];
  actions?: {
    icon: ReactNode;
    onClick: ({ rowData, tableState }: ActionParams) => void;
  }[];
  sortBy?: string[];
}

export const ListBase: FC<ListBaseProps> = ({
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
  const listItemTitle = (item: ListItem) => {
    if (item.titleRender) return item.titleRender;
    return (
      <div
        className={`List-Items-Item-Title List-Items-Item-Title-color-${color}`}
      >
        {item.title}
      </div>
    );
  };

  const listItemDescription = (item: ListItem) => {
    if (item.descriptionRender) return item.descriptionRender;
    if (item.description)
      return (
        <div className="List-Items-Item-Description">{item.description}</div>
      );
    return null;
  };

  return (
    <div className="List" data-testid="List">
      <div className={`List-Header List-Header-color-${color}`}>
        <h2 className="List-Header-Title"> {headerTitle} </h2>
        {listViewOptions?.sort && (
          <div className="List-Header-Sort">
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
          <TextField
            id="Search"
            label="Search"
            onChange={(e) => onSearchQueryChange(e.target.value)}
          />
        )}
        {headerActions && (
          <div data-testid="ACList-HeaderActions">
            {headerActions.map((action, i) => (
              <Button
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
              </Button>
            ))}
          </div>
        )}
      </div>
      <div className="List-Items" data-testid="List-Items">
        {rows.map((item, i) => (
          <div
            className="List-Items-Item"
            data-testid="List-Items-Item"
            key={item.id + i}
          >
            <div
              className="List-Items-Item-Data"
              onClick={() => {
                if (onItemClicked) onItemClicked(item);
              }}
            >
              {listItemTitle(item)}
              {listItemDescription(item)}
            </div>
            {actions && (
              <div
                data-testid="List-Items-Item-Icons"
                className="List-Items-Item-Icons"
              >
                {actions.map((action, i) => (
                  <Button
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
                  </Button>
                ))}
              </div>
            )}
          </div>
        ))}

        {rows && rows.length === 0 && (
          <span className="List-Items-noResults"> No items found </span>
        )}
      </div>
      <div className="List-Pagination">
        <div className="List-Pagination-RowsSelect">
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
