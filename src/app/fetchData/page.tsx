"use client";
import apiService from "@/utils/apiService";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Sidebar } from "@/lang/layout";

type PostType = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

const FetchPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => fetchData(),
    staleTime: 0,
    retry: false,
  });

  async function fetchData(): Promise<PostType[]> {
    const payload = {};

    const response = await apiService.get("/todos");

    console.log(response);

    // if (!response.ok) {
    //   throw new Error("Failed to fetch data");
    // }

    const data = response.data;
    return data;

    // const { data } = await apiService.get("/todos");
    // console.log(data);

    // return data;

    // const response = await fetch("https://jsonplaceholder.typicode.com/todos");

    // if (!response.ok) {
    //   throw new Error("Failed to fetch data");
    // }

    // const data = await response.json();
    // return data;
  }

  return (
    <>
      <h1>{Sidebar["th"].dashboard}</h1>
      {/* <h1>{langLayout.th.dashboard}</h1> */}
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
        </>
      )}
    </>
  );
};

export default FetchPage;
