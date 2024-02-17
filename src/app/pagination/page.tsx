"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";

import Pagination from "@/components/pagination";

type PostType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type LangType = "th" | "en";

const PaginationPage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const totalPages = 6;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["postList", pageNumber],
    queryFn: function () {
      return fetchData(
        `https://jsonplaceholder.typicode.com/todos?_page=${pageNumber}`
      );
    },
    staleTime: 2000,
  });

  const fetchData = async (url: string) => {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return data;
  };

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {data?.map((item: PostType) => (
            <div
              className="h-10 border border-red-500 border-solid"
              key={item.id}
            >
              {item.id}. {item.title}
            </div>
          ))}
          <Pagination
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            totalPages={totalPages}
          />
        </>
      )}
    </>
  );
};

export default PaginationPage;
