"use client";
//"use server";
import React, { useEffect, useState } from "react";
import Pa from "@/components/pa";
import Show from "@/components/show";
import { useQuery } from "react-query";

export default function Test() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["postList"],
    queryFn: async function () {
      const response = await fetch("api");
      const data = await response.json();
      return data;
    },
    staleTime: 2000,
  });

  return (
    <div className="w-1/2">
      <div>
        {isLoading ? (
          "Loading..."
        ) : isError ? (
          "Error"
        ) : (
          <div>
            {data.message}
            <br />
            <br />
            <Show word={data.message}></Show>
          </div>
        )}
      </div>
      <br />
      <br />
      First
      <br />
      <br />
      <Pa />
    </div>
  );
}
