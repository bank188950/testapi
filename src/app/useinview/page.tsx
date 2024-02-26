"use client";
import React, { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

export default function InfScroll() {
  const [ref, inView] = useInView({
    threshold: 0,
  });

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

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  return (
    <>
      <div className="h-96 w-72 overflow-y-auto">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            {data?.pages.map((page, i) => (
              <div key={i} className={`page-${i}`}>
                {page.map((item: any) => (
                  <div className="p-2 bg-red-500 mt-4" key={item.id}>
                    {item.title}
                  </div>
                ))}
              </div>
            ))}
            <button
              ref={ref}
              className="bg-gray-500"
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage
                ? "Loading more..."
                : hasNextPage
                ? "Load More"
                : "Nothing more to load"}
            </button>
          </>
        )}
      </div>
    </>
  );
}
