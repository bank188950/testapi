"use client";
import React, { useState, useEffect } from "react";
import { set } from "react-hook-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";

type DataType = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

const TempData = () => {
  const changeType = (type: number) => {
    //queryClient.removeQueries(["users"]);
    setTempData([]);
    setCurrentPage(1);
    setCurrentType(type);
    setTotalPage(Math.floor(Math.random() * 10) + 1);
  };

  const queryClient = useQueryClient();
  const [tempData, setTempData] = useState<DataType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentType, setCurrentType] = useState(1);
  const [totalPage, setTotalPage] = useState(2);

  const { data, isLoading } = useQuery({
    queryKey: ["users", `${currentPage}_${currentType}`],
    queryFn: async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos?_page=${currentPage}&type=${currentType}`
      );
      const json = await response.json();
      return json;
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      console.log(data);
      setTempData((prev) => [...prev, ...data]);
    }
  }, [data]);

  return (
    <div>
      <div className="bg-blue-500 w-20" onClick={() => changeType(1)}>
        Cate 1
      </div>
      <div className="bg-blue-500 mt-1 w-20" onClick={() => changeType(2)}>
        Cate 2
      </div>
      {isLoading && <div>Loading...</div>}

      {data && tempData.map((user) => <div key={user.id}>{user.title}</div>)}

      <button
        className="bg-red-500 mt-2"
        onClick={() => {
          if (currentPage < totalPage) {
            setCurrentPage(currentPage + 1);
          }
        }}
      >
        Next Page
      </button>
      <br />
      <br />

      <button
        onClick={() => queryClient.refetchQueries({ queryKey: ["users"] })}
      >
        refetchQueries ALL
      </button>
      <br />
      <button
        onClick={() => queryClient.invalidateQueries({ queryKey: ["users"] })}
      >
        invalidateQueries ALL
      </button>
    </div>
  );
};

export default TempData;
