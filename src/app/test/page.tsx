"use client";
//"use server";
import React, { useEffect, useState } from "react";
import Pa from "@/components/pa";
import Show from "@/components/show";
import { useQuery } from "@tanstack/react-query";
import "mac-scrollbar/dist/mac-scrollbar.css";
import { MacScrollbar } from "mac-scrollbar";
import Cookies from "js-cookie";
import { cookies } from "next/headers";
import { fetchProfileAuth } from "@/fetch/leftMenu";
export default function Test() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["postList"],
    queryFn: fetchProfileAuth,
    staleTime: 2000,
  });

  return (
    <div className="w-1/2">
      {Cookies.get("lang")}
      {/* <div>
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
      <Pa /> */}
      {/* <MacScrollbar
        minThumbSize={50}
        className="h-[calc(100vh-144px)] w-30 bg-slate-400"
        // suppressAutoHide={true}
        suppressScrollX={true}
        thumbStyle={function () {
          const thumbStyle: React.CSSProperties = {
            backgroundColor: "red",
            // borderRadius: "10px",
          };
          return thumbStyle;
        }}
        trackStyle={function () {
          const trackStyle: React.CSSProperties = {
            backgroundColor: "blue",
            width: "10px",
          };
          return trackStyle;
        }}
        trackGap={50}
      > */}
      <MacScrollbar
        className="h-[calc(100vh-144px)]"
        thumbStyle={function () {
          const thumbStyle: React.CSSProperties = {
            backgroundColor: "red",
            // borderRadius: "10px",
          };
          return thumbStyle;
        }}
      >
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        {/* <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div> */}
      </MacScrollbar>
    </div>
  );
}
