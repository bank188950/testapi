"use client";
import React, { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";

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

  const { data, isLoading } = useQuery(["users", currentPage], async () => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos?_page=${currentPage}`
    );
    const json = await response.json();
    return json;
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
      console.log("prefetching", nextPage);
      queryClient.prefetchQuery(["users", nextPage], async () => {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/todos?_page=${nextPage}`
        );
        const json = await response.json();
        return json;
      });
    }
  }, [currentPage]);

  return (
    <div>
      {isLoading && <div>Loading...</div>}

      {data && tempData.map((user) => <div key={user.id}>{user.title}</div>)}
      <button
        className="bg-red-500 mt-2"
        onClick={() => {
          if (currentPage < 5) {
            setCurrentPage(currentPage + 1);
          }
        }}
      >
        Next Page
      </button>
    </div>
  );
};

export default TempData;
