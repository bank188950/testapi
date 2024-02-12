"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useQuery } from "react-query";

import langHome from "@/lang/home.json";
import Pagination from "@/components/pagination";

type PostType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type LangType = "th" | "en";

const PaginationPage = () => {
  const [lang, setLang] = useState<LangType>("th");
  const [content, setContent] = useState<(typeof langHome)[LangType] | null>(
    null
  );

  useEffect(() => {
    setContent(langHome[lang]);
  }, [lang]);

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
      <h1>{content?.title}</h1>
      <p>{content?.content}</p>

      <div className="flex gap-2">
        <button onClick={() => setLang("th")}>TH</button>
        <button onClick={() => setLang("en")}>EN</button>
      </div>

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
