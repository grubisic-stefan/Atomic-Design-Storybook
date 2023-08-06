import React, { FC, ReactNode, useEffect, useState } from "react";
import { useDebounce } from "../../../../utils/hooks";
import {
  ACActionParams,
  ACListBase,
  ACListItem,
  ACListState,
  ACStandardListProps,
} from "../ACListBase/ACListBase";

export interface ACListRemoteProps extends ACStandardListProps {
  rows: ACListItem[];
  pagesCount: number;
  allItemsCount: number;
  sortBy?: string[];
  onTableStateChange: (listState: ACListState) => void;
  headerActions?: {
    icon: ReactNode;
    onClick: (listState: ACListState) => void;
  }[];
  actions?: {
    icon: ReactNode;
    onClick: ({ rowData, tableState }: ACActionParams) => void;
  }[];
}

const ACListRemote: FC<ACListRemoteProps> = ({
  rows,
  allItemsCount,
  pagesCount,
  headerTitle,
  color = "primary",
  onTableStateChange,
  onItemClicked,
  paginationStyleProps,
  listViewOptions,
  headerActions,
  actions,
  sortBy = ["name", "description"],
}) => {
  const [rowsNumber, setRowsNumber] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState({ field: "", type: "asc" });

  useEffect(() => {
    const listState: ACListState = {
      currentPage,
      itemsPerPage: rowsNumber,
      searchQuery: debouncedSearchQuery,
      sort,
    };

    onTableStateChange(listState);
  }, [rowsNumber, debouncedSearchQuery, currentPage, sort]);

  const handleItemSelect = (selectedItem: ACListItem) => {
    if (onItemClicked) {
      onItemClicked(selectedItem);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [rowsNumber, debouncedSearchQuery, sort]);

  useEffect(() => {
    if (pagesCount < currentPage || currentPage < 1) {
      setCurrentPage(1);
    }
  }, [pagesCount]);

  return (
    <ACListBase
      onItemClicked={handleItemSelect}
      headerTitle={headerTitle}
      rows={rows}
      allItemsCount={allItemsCount}
      debouncedSearchQuery={debouncedSearchQuery}
      sort={sort}
      onSortChange={(sort) => setSort(sort)}
      onSearchQueryChange={(searchQuery) => setSearchQuery(searchQuery)}
      rowsNumber={rowsNumber}
      onRowsNumberChange={(rowsNumber) => setRowsNumber(rowsNumber)}
      currentPage={currentPage}
      onCurrentPageChange={(currentPage) => setCurrentPage(currentPage)}
      pagesCount={pagesCount}
      color={color}
      paginationStyleProps={paginationStyleProps}
      listViewOptions={listViewOptions}
      headerActions={headerActions}
      actions={actions}
      sortBy={sortBy}
    />
  );
};

export default ACListRemote;
