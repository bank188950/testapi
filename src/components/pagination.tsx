import React from "react";

type PaginationProps = {
  pageNumber: number;
  setPageNumber: (page: number) => void;
  totalPages: number;
  totalCount?: number;
};

const Pagination = ({
  pageNumber,
  setPageNumber,
  totalPages,
  totalCount,
}: PaginationProps) => {
  const isFirstPage: boolean = pageNumber === 1;
  const isLastPage: boolean = pageNumber >= totalPages;

  function handleFirstPage() {
    setPageNumber(1);
  }

  function handleLastPage() {
    setPageNumber(totalPages);
  }

  function createPage(num: number): number[] {
    return [...Array(num)].map((_, i) => i + 1);
  }

  return (
    totalPages > 1 && (
      <div className="pagination flex gap-1 mt-1">
        <button
          className="p-2 bg-slate-600"
          onClick={handleFirstPage}
          disabled={isFirstPage}
        >
          Prev All
        </button>
        <button
          className="p-2 bg-slate-600"
          onClick={() => setPageNumber(pageNumber - 1)}
          disabled={isFirstPage}
        >
          Prev
        </button>

        {createPage(totalPages).map((i) => {
          if (
            i === pageNumber ||
            i === pageNumber - 1 ||
            i === pageNumber - 2 ||
            i === pageNumber + 1 ||
            i === pageNumber + 2
          ) {
            return (
              <button
                key={`page-${i}`}
                onClick={() => setPageNumber(i)}
                className={
                  pageNumber === i
                    ? "p-2 bg-blue-600 active"
                    : "p-2 bg-slate-600"
                }
              >
                {i}
              </button>
            );
          } else if (i === pageNumber - 3 || i === pageNumber + 3) {
            return (
              <button
                key={`page-${i}`}
                className="p-2 bg-slate-600"
                disabled
                style={{ border: "none" }}
              >
                ...
              </button>
            );
          }
          return null;
        })}

        <button
          className="p-2 bg-slate-600"
          onClick={() => setPageNumber(pageNumber + 1)}
          disabled={isLastPage}
        >
          Next
        </button>
        <button
          className="p-2 bg-slate-600"
          onClick={handleLastPage}
          disabled={isLastPage}
        >
          Next All
        </button>
      </div>
    )
  );
};

export default Pagination;
