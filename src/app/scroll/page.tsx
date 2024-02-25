"use client";
import React, { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useInView } from "react-intersection-observer";

type DataType = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

const TempData = () => {
  const queryClient = useQueryClient();
  const [tempData, setTempData] = useState<DataType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [ref, inView] = useInView({
    threshold: 0,
  });

  async function selectDataList(currentPage: number) {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos?_page=${currentPage}`
    );
    const json = await response.json();
    return json;
  }

  const { data, isLoading } = useQuery(["users", currentPage], () => {
    return selectDataList(currentPage);
  });

  useEffect(() => {
    if (data) {
      console.log(data);
      setTempData((prev) => [...prev, ...data]);
    }
  }, [data]);

  useEffect(() => {
    if (currentPage < 5) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery(["users", nextPage], () => {
        return selectDataList(nextPage);
      });
    }
  }, [currentPage]);

  useEffect(() => {
    if (inView && currentPage < 5) {
      setCurrentPage(currentPage + 1);
    }
  }, [inView]);

  return (
    <div className="h-56 w-56 overflow-y-auto">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {data &&
            tempData.map((user) => <div key={user.id}>{user.title}</div>)}
          <button className="bg-red-500 mt-2" ref={ref}>
            Next Page
          </button>
        </>
      )}
    </div>
  );
};

export default TempData;
