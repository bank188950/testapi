"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import Pagination from "@/components/pagination";
import { a } from "@/utils/helper";

type PostType = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
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

  async function fetchData(url: string): Promise<PostType[]> {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return data;
  }

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
              {item.id}. {item.title} {item.completed ? "true" : "false"}
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
