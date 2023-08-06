import React, {
  CSSProperties,
  FC,
  ReactElement,
  useEffect,
  useCallback,
  useState,
} from "react";
import "./ACTable.scss";
import { AiOutlineArrowUp } from "react-icons/ai";
import { FaFilter } from "react-icons/fa";
import ACPagination from "../../molecules/ACPagination";
import ACButton from "../../atoms/ACButton";
import ACFilter, { ACFilterItem } from "../../molecules/ACFilter/ACFilter";
import { ACLoading, ACSpinner } from "../../atoms";
import {
  TableFooter,
  TableHeading,
  TableScroll,
  TableWrapper,
  NoOfPageSpan,
} from "./styled";
import ACCheckBox from "../../atoms/ACCheckBox/ACCheckBox";

export interface IACTableColumn {
  field: string;
  title: string;
}

export interface IACTableRow {
  rawData: any;
  render: any;
}

export interface IACActionConditional {
  rowData: (rowData: IACTableRow) => {
    icon: ReactElement;
    onClick: ({ rowData, tableState }: IACActionParams) => void;
    hide?: (rowData: IACTableRow) => boolean;
    disabled?: (rowData: IACTableRow) => boolean;
  };
}

export interface IACAction {
  icon: ReactElement;
  onClick: ({ rowData, tableState }: IACActionParams) => void;
}

export interface IACActionParams {
  rowData: IACTableRow | IACTableRow[];
  tableState: IACTableState;
}

export interface IACTableProps {
  columns: IACTableColumn[];
  rows: IACTableRow[];
  headerTitle: string;
  allItemsCount: number;
  pagesCount: number;
  dataTestId?: string;
  onTableStateChange: (tableState: IACTableState) => void;
  initialRowsNumber?: 5 | 10 | 25 | 50;
  filter?: ACFilterItem[];
  onShowFilter?: () => void;
  actions?: (IACAction | IACActionConditional)[];
  multipleSelectionsActions?: {
    icon: ReactElement;
    onClick: ({ rowData, tableState }: IACActionParams) => void;
  }[];
  headerActions?: {
    icon: ReactElement;
    onClick: () => void;
  }[];
  selection?: boolean;
  onSelectionChange?: (selectedRows: any[]) => void;
  onItemClicked?: (row: any) => void;
  color?: "primary" | "secondary";
  paginationStyle?: {
    stylePaginationWrapper?: CSSProperties;
    stylePaginationItem?: CSSProperties;
    paginationItemActiveClass?: string;
    paginationItemClass?: string;
    stylePaginationDots?: CSSProperties;
    stylePaginationBefore?: CSSProperties;
    stylePaginationAfter?: CSSProperties;
    stylePaginationFirst?: CSSProperties;
    stylePaginationLast?: CSSProperties;
  };

  style?: {
    tableWrapper?: CSSProperties;
    tableHeaderStyle?: CSSProperties;
    tableRowStyle?: CSSProperties;
    tableColumnHeadStyle?: CSSProperties;
    actionsClassName?: string;
    headerActionsClassName?: string;
    multipleSelectionsActionsClassName?: string;
    filterButtonClassName?: string;
    tooltipsStyle?: CSSProperties;
  };

  tableFooter?: boolean;
  showNumberPerPage?: boolean;
  enableSorting?: boolean;
}

export interface IACTableState {
  sort: { field: string; type: string };
  currentPage: number;
  itemsPerPage: number;
  filter: any;
}

export const ACTable: FC<IACTableProps> = ({
  columns,
  rows,
  headerTitle,
  allItemsCount,
  pagesCount,
  initialRowsNumber = 5,
  onTableStateChange,
  filter,
  onShowFilter,
  actions,
  multipleSelectionsActions,
  headerActions,
  selection,
  dataTestId,
  onSelectionChange,
  onItemClicked,
  color = "primary",
  paginationStyle,
  style,
  tableFooter = true,
  showNumberPerPage = true,
  enableSorting = true,
}) => {
  const [filterState, setFilterState] = useState({} as any);
  const [showFilter, setShowFilter] = useState(false);
  const [sort, setSort] = useState({ field: "", type: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsNumber, setRowsNumber] = useState(initialRowsNumber);
  const [selectedRows, setSelectedRows] = useState([] as IACTableRow[]);

  useEffect(() => {
    setCurrentPage(1);
  }, [pagesCount, filterState, sort, rowsNumber]);

  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(selectedRows);
    }
  }, [selectedRows]);

  useEffect(() => {
    const tableState: IACTableState = {
      sort,
      currentPage,
      itemsPerPage: rowsNumber,
      filter: filterState,
    };
    onTableStateChange(tableState);
  }, []);

  const handleActions = useCallback(
    (
      action: "sort" | "currentPage" | "itemsPerPage" | "filter",
      actionValue: any
    ) => {
      // CURRENT FIX FOR TABLE RENDERING TWICE INITIALLY
      if (action === "filter" && Object.keys(filterState).length === 0) {
        return;
      }

      const tableState: IACTableState = {
        sort,
        currentPage,
        itemsPerPage: rowsNumber,
        filter: filterState,
      };
      tableState[action] = actionValue;
      onTableStateChange(tableState);
    },
    [sort, currentPage, rowsNumber, filterState]
  );

  const handleOnSelectionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    row: IACTableRow
  ) => {
    if (e.target.checked) {
      setSelectedRows((prevState) => [...prevState, row]);
    } else {
      if (selectedRows.find((r) => r.rawData.uuid === row.rawData.uuid)) {
        setSelectedRows((prevState) =>
          prevState.filter((r) => r.rawData.uuid !== row.rawData.uuid)
        );
      }
    }
  };

  if (rows !== undefined) {
    return (
      <TableWrapper style={style?.tableWrapper}>
        {filter && (
          <ACFilter
            style={{
              display: showFilter ? "" : "none",
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              marginBottom: "4px",
            }}
            tooltipsStyle={style?.tooltipsStyle}
            filter={filter}
            onFilterChanged={setFilterState}
            dataTestId={dataTestId}
            handleActions={handleActions}
            closeButtonVisible
            onCloseButtonClick={() => setShowFilter(false)}
          />
        )}

        <TableHeading style={style?.tableHeaderStyle}>
          {selectedRows?.length === 0 && (
            <span style={{ fontSize: "1.5rem" }}> {headerTitle} </span>
          )}
          {selectedRows?.length > 0 && (
            <span className="ACTable-selectedRowsNum">
              {selectedRows?.length} row(s) selected
            </span>
          )}
          <div className="ACTable-header-right">
            {filter && (
              <ACButton
                iconButton
                onClick={() => {
                  setShowFilter((prevState) => !prevState);
                  if (onShowFilter && !showFilter) {
                    onShowFilter();
                  }
                }}
                style={{ boxShadow: "none" }}
                color={color}
                className={style?.filterButtonClassName}
              >
                {<FaFilter data-testid="showFilterButton" />}
              </ACButton>
            )}

            {multipleSelectionsActions && selectedRows?.length > 0 && (
              <span className="ACTable-table-data-actions-wrapper">
                {multipleSelectionsActions.map((action, i) => (
                  <span
                    className="ACTable-table-data-actions-iconWrapper"
                    key={i}
                    onClick={(e) =>
                      action.onClick({
                        rowData: selectedRows.map(
                          ({ render, ...item }) => item.rawData
                        ),
                        tableState: {
                          sort,
                          currentPage,
                          itemsPerPage: rowsNumber,
                          filter: filterState,
                        },
                      })
                    }
                  >
                    <ACButton
                      style={{ boxShadow: "none" }}
                      iconButton
                      className={style?.multipleSelectionsActionsClassName}
                    >
                      {action.icon}
                    </ACButton>
                  </span>
                ))}
              </span>
            )}

            {headerActions && selectedRows?.length === 0 && (
              <span
                data-testid="headerActionsWrapper"
                className="ACTable-table-data-actions-wrapper"
              >
                {headerActions.map((action, i) => (
                  <span
                    className="ACTable-table-data-actions-iconWrapper"
                    key={i}
                    onClick={action.onClick}
                  >
                    <ACButton
                      style={{ boxShadow: "none" }}
                      iconButton
                      className={style?.headerActionsClassName}
                    >
                      {action.icon}
                    </ACButton>
                  </span>
                ))}
              </span>
            )}
          </div>
        </TableHeading>

        <TableScroll tableFooter={tableFooter}>
          <table className="ACTable-table">
            <thead>
              {
                <tr>
                  {selection && (
                    <th
                      style={style?.tableColumnHeadStyle}
                      className="ACTable-table-Tablehead-column-head-wrapper"
                    >
                      <ACCheckBox
                        onChange={() =>
                          selectedRows?.length === rows?.length
                            ? setSelectedRows([])
                            : setSelectedRows(rows)
                        }
                        checked={
                          selectedRows?.length === rows?.length &&
                          rows?.length > 0
                        }
                      />
                    </th>
                  )}
                  {columns.map((column) => (
                    <React.Fragment key={column.field}>
                      <th
                        style={style?.tableColumnHeadStyle}
                        className="ACTable-table-Tablehead-column-head-wrapper"
                        onClick={() => {
                          if (enableSorting) {
                            setSort((prevState) => ({
                              field: column.field,
                              type: prevState.type === "asc" ? "desc" : "asc",
                            }));
                            handleActions("sort", {
                              field: column.field,
                              type: sort.type === "asc" ? "desc" : "asc",
                            });
                          }
                        }}
                      >
                        <span className="ACTable-table-Tablehead-column-head">
                          <span className="ACTable-table-Tablehead-column-head-title">
                            {column.title}
                          </span>

                          <AiOutlineArrowUp
                            className={
                              sort.type === "asc"
                                ? "ACTable-table-Tablehead-column-head-sortIcon"
                                : "ACTable-table-Tablehead-column-head-sortIcon-rotated180"
                            }
                            style={{
                              visibility:
                                sort.field === column.field
                                  ? "visible"
                                  : "hidden",
                            }}
                          />
                        </span>
                      </th>
                    </React.Fragment>
                  ))}
                  {actions && selectedRows?.length === 0 && (
                    <th style={style?.tableColumnHeadStyle}> Actions </th>
                  )}
                </tr>
              }
            </thead>
            <tbody>
              {rows.map((row) => (
                <React.Fragment key={row.rawData.uuid}>
                  <tr
                    className={`ACTable-table-data-row ${
                      selectedRows.find(
                        (r) => r.rawData.uuid === row.rawData.uuid
                      )
                        ? "ACTable-table-data-row-selected"
                        : ""
                    }`}
                    style={style?.tableRowStyle}
                  >
                    {selection && (
                      <td className="ACTable-table-data-row-selectCheckbox">
                        <ACCheckBox
                          onChange={(e) => handleOnSelectionChange(e, row)}
                          checked={
                            selectedRows.find(
                              (r) => r.rawData.uuid === row.rawData.uuid
                            )
                              ? true
                              : false
                          }
                        />
                      </td>
                    )}

                    {columns.map((column) => (
                      <td
                        onClick={() =>
                          onItemClicked && onItemClicked(row.rawData)
                        }
                        key={row.rawData.uuid + column.field}
                      >
                        {row.render[column.field] !== undefined &&
                          row.render[column.field]}
                      </td>
                    ))}
                    {actions && selectedRows?.length === 0 && (
                      <td className="ACTable-table-data-row-actions-td">
                        <span className="ACTable-table-data-actions-wrapper">
                          {actions?.map((action, i) => {
                            let isDisabled = false;
                            let isHidden = false;
                            let isConditional =
                              action.hasOwnProperty("rowData");
                            let actionConditional!: IACActionConditional;
                            let actionRegular!: IACAction;
                            if (isConditional) {
                              actionConditional =
                                action as IACActionConditional;
                              let data = actionConditional.rowData(row.rawData);
                              isHidden = data.hasOwnProperty("hide")
                                ? data?.hide?.(row)!
                                : false;
                              isDisabled = data.hasOwnProperty("disabled")
                                ? data?.disabled?.(row)!
                                : false;
                            } else {
                              actionRegular = action as IACAction;
                            }
                            return (
                              <React.Fragment key={i}>
                                {isConditional ? (
                                  <span
                                    className="ACTable-table-data-actions-iconWrapper"
                                    onClick={(e) =>
                                      isConditional
                                        ? actionConditional
                                            .rowData(row.rawData)
                                            .onClick({
                                              rowData: row.rawData,
                                              tableState: {
                                                sort,
                                                currentPage,
                                                itemsPerPage: rowsNumber,
                                                filter: filterState,
                                              },
                                            })
                                        : actionRegular.onClick({
                                            rowData: row.rawData,
                                            tableState: {
                                              sort,
                                              currentPage,
                                              itemsPerPage: rowsNumber,
                                              filter: filterState,
                                            },
                                          })
                                    }
                                  >
                                    {!isHidden && (
                                      <ACButton
                                        iconButton
                                        variant="text"
                                        size="large"
                                        color={color}
                                        disabled={isDisabled}
                                        className={style?.actionsClassName}
                                      >
                                        {
                                          actionConditional.rowData(row.rawData)
                                            .icon
                                        }
                                      </ACButton>
                                    )}
                                  </span>
                                ) : (
                                  <span
                                    className="ACTable-table-data-actions-iconWrapper"
                                    onClick={(e) =>
                                      actionRegular.onClick({
                                        rowData: row.rawData,
                                        tableState: {
                                          sort,
                                          currentPage,
                                          itemsPerPage: rowsNumber,
                                          filter: filterState,
                                        },
                                      })
                                    }
                                  >
                                    <ACButton
                                      iconButton
                                      variant="text"
                                      size="large"
                                      color={color}
                                      className={style?.actionsClassName}
                                    >
                                      {actionRegular.icon}
                                    </ACButton>
                                  </span>
                                )}
                              </React.Fragment>
                            );
                          })}
                        </span>
                      </td>
                    )}
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </TableScroll>

        {rows?.length === 0 && (
          <div className="ACTable-noResults">
            <span> No results </span>
          </div>
        )}

        {tableFooter && (
          <TableFooter tableFooter={tableFooter} className="ACTable-pagination">
            <div className="ACTable-pagination-rowsSelect">
              {showNumberPerPage && (
                <select
                  defaultValue={rowsNumber}
                  onChange={(e) => {
                    handleActions("itemsPerPage", Number(e.target.value));
                    setRowsNumber(Number(e.target.value) as 5 | 10 | 25 | 50);
                  }}
                >
                  <option value={5}>5 Rows</option>
                  <option value={10}>10 Rows</option>
                  <option value={25}>25 Rows</option>
                  <option value={50}>50 Rows</option>
                </select>
              )}
              {rows?.length > 0 && allItemsCount && (
                <NoOfPageSpan>
                  {currentPage * rowsNumber - rowsNumber + 1} -{" "}
                  {currentPage * rowsNumber > allItemsCount
                    ? allItemsCount
                    : currentPage * rowsNumber}{" "}
                  of {allItemsCount} results
                </NoOfPageSpan>
              )}
              {allItemsCount === 0 && <NoOfPageSpan> 0 results </NoOfPageSpan>}
            </div>
            {allItemsCount !== 0 && (
              <ACPagination
                currentPage={currentPage}
                pagesCount={pagesCount}
                color={color}
                handleChange={({ selectedPage }) => {
                  handleActions("currentPage", selectedPage);
                  setCurrentPage(selectedPage);
                }}
                {...paginationStyle}
              />
            )}
          </TableFooter>
        )}
      </TableWrapper>
    );
  }
  return <></>;
};
