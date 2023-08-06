import { useState, useEffect } from "react";
import { useDebounce } from "../../../../utils/hooks";
import { ListItem } from "../ListBase/ListBase";

const useLocalList = (allItems: ListItem[]) => {
  const [rowsNumber, setRowsNumber] = useState(5);
  const [currentItems, setCurrentItems] = useState(allItems);
  const [sortedAllItems, setSortedAllItems] = useState(allItems);
  const [itemsOnScreen, setItemsOnScreen] = useState(
    allItems.slice(0, rowsNumber)
  );
  const [pagesCount, setPagesCount] = useState(
    allItems.length / rowsNumber < 1
      ? 1
      : Math.ceil(allItems.length / rowsNumber)
  );
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState({ field: "", type: "" });

  useEffect(() => {
    const filteredItems = sortedAllItems.filter((item) =>
      (item.title + " " + item.description)
        .toLowerCase()
        .includes(debouncedSearchQuery.toLowerCase())
    );

    setCurrentPage(1);
    setCurrentItems(filteredItems);
    setItemsOnScreen(filteredItems.slice(0, rowsNumber));
    setPagesCount(
      filteredItems.length / rowsNumber < 1
        ? 1
        : Math.ceil(filteredItems.length / rowsNumber)
    );
  }, [debouncedSearchQuery]);

  useEffect(() => {
    setPagesCount(
      currentItems.length / rowsNumber < 1
        ? 1
        : Math.ceil(currentItems.length / rowsNumber)
    );

    setItemsOnScreen(currentItems.slice(0, rowsNumber));
    setCurrentPage(1);
  }, [rowsNumber]);

  useEffect(() => {
    setItemsOnScreen(
      currentItems.slice(
        currentPage * rowsNumber - rowsNumber,
        currentPage * rowsNumber
      )
    );
  }, [currentPage]);

  useEffect(() => {
    const sortParameter = sort.field;
    const sortDirection = sort.type;

    let sortedCurrentItems: ListItem[] = [];
    let sortedAllItems: ListItem[] = [];
    if (sortParameter === "title" && sortDirection === "asc") {
      sortedAllItems.push(
        ...allItems.sort((a, b) => a.title.localeCompare(b.title))
      );
      sortedCurrentItems.push(
        ...currentItems.sort((a, b) => a.title.localeCompare(b.title))
      );
    } else if (sortParameter === "title" && sortDirection === "desc") {
      sortedAllItems.push(
        ...allItems.sort((a, b) => b.title.localeCompare(a.title))
      );
      sortedCurrentItems.push(
        ...currentItems.sort((a, b) => b.title.localeCompare(a.title))
      );
    } else if (sortParameter === "description" && sortDirection === "asc") {
      sortedAllItems.push(
        ...allItems.sort((a, b) => {
          if (!a.description) {
            return -1;
          }
          if (!b.description) {
            return 1;
          }
          return a.description.localeCompare(b.description);
        })
      );
      sortedCurrentItems.push(
        ...currentItems.sort((a, b) => {
          if (!a.description) {
            return -1;
          }
          if (!b.description) {
            return 1;
          }

          return a.description.localeCompare(b.description);
        })
      );
    } else if (sortParameter === "description" && sortDirection === "desc") {
      sortedAllItems.push(
        ...allItems.sort((a, b) => {
          if (!a.description) {
            return -1;
          }
          if (!b.description) {
            return 1;
          } else {
            return b.description.localeCompare(a.description);
          }
        })
      );
      sortedCurrentItems.push(
        ...currentItems.sort((a, b) => {
          if (!a.description) {
            return -1;
          }
          if (!b.description) {
            return 1;
          } else {
            return b.description.localeCompare(a.description);
          }
        })
      );
    } else {
      return;
    }

    setSortedAllItems(sortedAllItems);
    setCurrentItems(sortedCurrentItems);
    setItemsOnScreen(sortedCurrentItems.slice(0, rowsNumber));
    setCurrentPage(1);
  }, [sort]);

  return [
    rowsNumber,
    setRowsNumber,
    currentItems,
    itemsOnScreen,
    pagesCount,
    setSearchQuery,
    debouncedSearchQuery,
    currentPage,
    setCurrentPage,
    setSort,
    sort,
  ] as const;
};

export default useLocalList;
