"use client";
import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function InfScroll() {
  async function fetchTodos({ pageParam }: { pageParam: number }) {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/todos?_page=${pageParam}`
    );
    return res.json();
  }

  const { isLoading, data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["todos"],
      queryFn: (props) => fetchTodos(props),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = lastPage.length ? allPages.length + 1 : undefined;
        return nextPage;
      },
    });

  return (
    <>
      <button
        className="bg-gray-500"
        disabled={!hasNextPage || isFetchingNextPage}
        onClick={() => fetchNextPage()}
      >
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Load More"
          : "Nothing more to load"}
      </button>
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            {data?.pages.map((page, i) => (
              <div key={i} className={`page-${i}`}>
                {page.map((item: any) => (
                  <div key={item.id}>{item.title}</div>
                ))}
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}
