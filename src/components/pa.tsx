//"use client";
import { a } from "@/utils/helper";
import React from "react";
import Box from "@/components/box";

const Pa = () => {
  return (
    <div>
      <Box number={100}></Box>|{a}
      {process.env.FIREBASE}
    </div>
  );
};

export default Pa;
