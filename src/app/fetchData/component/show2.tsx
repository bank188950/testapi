"use client";
import apiService from "@/utils/apiService";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Sidebar } from "@/lang/layout";
import { useFormContext } from "react-hook-form";
import { fieldValidate } from "../page";

type PostType = {
  id: number;
  name: string;
  username: string;
  email: string;
};

const Show2 = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: async () => fetchData(),
    staleTime: 0,
    retry: false,
  });

  async function fetchData(): Promise<PostType[]> {
    const payload = {};

    const response = await apiService.get("/users");

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
      <input
        id="fullname"
        {...register("fullname", fieldValidate.fullname)}
        className="w-full border border-solid border-gray-500"
        placeholder="รายละเอียดเพิ่มเติ่ม"
      />
      <br />
      <br />

      <input
        id="fullname"
        {...register("tel", fieldValidate.tel)}
        className="w-full border border-solid border-gray-500"
        placeholder="รายละเอียดเพิ่มเติ่ม"
      />
      <br />
      <br />
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
              {item.id}. {item.name} {item.email}
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default Show2;
