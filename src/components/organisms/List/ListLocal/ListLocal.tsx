import React, { FC } from "react";
import useLocalList from "../hooks/useLocalList";
import { ListBase, ListItem, StandardListProps } from "../ListBase/ListBase";

export interface ListLocalProps extends StandardListProps {
  allItems: ListItem[];
}

const ACListLocal: FC<ListLocalProps> = ({
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

  const handleItemSelect = (selectedItem: ListItem) => {
    if (onItemClicked) {
      onItemClicked(selectedItem);
    }
  };

  return (
    <ListBase
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
