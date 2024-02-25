"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { queryClient } from "@/app/AppProvider";
import { useQuery } from "react-query";
import { useInView } from "react-intersection-observer";

type PostType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const InfiniteScroll = () => {
  const [allData, setAllData] = useState<PostType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [scrollY, setScrollY] = useState(0);
  const scrollRef = useRef<null | HTMLDivElement>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["postList", currentPage],
    queryFn: function () {
      return fetchData(
        `https://jsonplaceholder.typicode.com/todos?_page=${currentPage}`
      );
    },
    staleTime: 0,
  });

  const [ref, inView] = useInView({
    threshold: 0,
  });

  const memoizedScrollY = useMemo(() => scrollY, [currentPage]);

  const fetchData = async (url: string) => {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const currentScrollY: number = scrollRef.current?.scrollTop ?? 0;
    setScrollY(currentScrollY);

    // Prefetch next page
    const nextPage = currentPage + 1;
    if (nextPage <= 5) {
      queryClient.prefetchQuery(["postList", currentPage + 1], () =>
        fetchData(
          `https://jsonplaceholder.typicode.com/todos?_page=${currentPage + 1}`
        )
      );
    }

    // Load current page
    if (inView && currentPage < 5) setCurrentPage((prev) => prev + 1);
  }, [inView]);

  useEffect(() => {
    if (data) {
      setAllData((prev) => [...prev, ...data]);
      scrollRef.current!.scrollTop = memoizedScrollY;
    }
  }, [data]);

  return (
    <div ref={scrollRef} className="h-96 w-64 overflow-y-auto">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {allData?.map((item) => (
            <div
              className="h-20 border border-red-500 border-solid"
              key={item.id}
            >
              {item.id}. {item.title}
            </div>
          ))}
          <div ref={ref}></div>
        </>
      )}
    </div>
  );
};

export default InfiniteScroll;
