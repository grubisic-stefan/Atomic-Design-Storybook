import React, { FC } from "react";
import useLocalList from "../hooks/useLocalList";
import {
  ACListBase,
  ACListItem,
  ACStandardListProps,
} from "../ACListBase/ACListBase";

export interface ACListLocalProps extends ACStandardListProps {
  allItems: ACListItem[];
}

const ACListLocal: FC<ACListLocalProps> = ({
  headerTitle,
  allItems,
  color = "primary",
  onItemClicked,
  paginationStyleProps,
  listViewOptions,
  actions,
  headerActions,
}) => {
  const [
    rowsNumber,
    setRowsNumber,
    currentItems,
    rows,
    pagesCount,
    setSearchQuery,
    debouncedSearchQuery,
    currentPage,
    setCurrentPage,
    setSort,
    sort,
  ] = useLocalList(allItems);

  const handleItemSelect = (selectedItem: ACListItem) => {
    if (onItemClicked) {
      onItemClicked(selectedItem);
    }
  };

  return (
    <ACListBase
      onItemClicked={handleItemSelect}
      headerTitle={headerTitle}
      rows={rows}
      debouncedSearchQuery={debouncedSearchQuery}
      allItemsCount={currentItems.length}
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
      actions={actions}
      headerActions={headerActions}
    />
  );
};

export default ACListLocal;
