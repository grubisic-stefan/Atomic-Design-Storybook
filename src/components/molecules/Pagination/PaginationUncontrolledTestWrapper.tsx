import React, { useState } from "react";

import Pagination from "./Pagination";

export const ACPaginationUncontrolledTestWrapper = ({
  page = 1,
  pages = 10,
  siblingsOnEachSide = 1,
  showFirstAndLastPages = true,
}: {
  page?: number;
  pages?: number;
  siblingsOnEachSide?: number;
  showFirstAndLastPages?: boolean;
}) => {
  const [currentPage, setCurrentPage] = useState(page);

  return (
    <Pagination
      pagesCount={pages}
      handleChange={({ selectedPage }) => {
        setCurrentPage(selectedPage);
      }}
      currentPage={currentPage}
      siblingsOnEachSide={siblingsOnEachSide}
      showFirstAndLastPages={showFirstAndLastPages}
    />
  );
};
