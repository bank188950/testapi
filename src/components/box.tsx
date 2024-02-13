//"use server";
"use client";
import { a } from "@/utils/helper";
import React from "react";

type BoxType = {
  number: number;
};

const Box = ({ number }: BoxType) => {
  return (
    <div>
      {number} {a}
    </div>
  );
};

export default Box;
