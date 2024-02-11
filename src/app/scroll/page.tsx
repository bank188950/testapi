"use client";

import React, { useState, useEffect } from "react";
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

  const { data, isLoading, isError } = useQuery({
    queryKey: ["postList", currentPage],
    queryFn: function () {
      return fetchData(
        `https://jsonplaceholder.typicode.com/todos?_page=${currentPage}`
      );
    },
    staleTime: 2000,
  });

  const [ref, inView] = useInView({
    threshold: 0,
  });

  const fetchData = async (url: string) => {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return data;
  };

  useEffect(() => {
    if (inView && currentPage < 5) setCurrentPage((prev) => prev + 1);
  }, [inView]);

  useEffect(() => {
    if (data) {
      setAllData((prev) => [...prev, ...data]);
    }
  }, [data]);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {allData?.map((item) => (
            <div
              className="h-20 border border-red-500 border-solid"
              key={item.id}
            >
              {item.title}
            </div>
          ))}
          <div ref={ref}></div>
        </>
      )}
    </>
  );
};

export default InfiniteScroll;
