"use client";
import React, { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useInView } from "react-intersection-observer";
import { selectMessageList, type messageDataType } from "./alertMessage";

const TempData = () => {
  const queryClient = useQueryClient();
  const [tempData, setTempData] = useState<messageDataType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [ref, inView] = useInView({
    threshold: 0,
  });

  const { data: dataMessageList, isLoading } = useQuery(
    ["users", currentPage],
    () => {
      return selectMessageList(currentPage);
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (dataMessageList) {
      console.log(dataMessageList);
      const newData: messageDataType[] = dataMessageList.data;
      setTempData((prev) => [...prev, ...newData]);
    }
  }, [dataMessageList]);

  // useEffect(() => {
  //   if (currentPage < 5) {
  //     const nextPage = currentPage + 1;
  //     queryClient.prefetchQuery(["users", nextPage], () => {
  //       return selectMessageList(currentPage);
  //     });
  //   }
  // }, [currentPage]);

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
          {dataMessageList &&
            tempData.map((user) => (
              <div key={user.messageId}>{user.title}</div>
            ))}
          <button className="bg-red-500 mt-2" ref={ref}>
            Next Page
          </button>
        </>
      )}
    </div>
  );
};

export default TempData;
