//"use server";
"use client";
import { a } from "@/utils/helper";
import React, { useState } from "react";

type BoxType = {
  number: number;
};

const Box = ({ number }: BoxType) => {
  //const [b, setB] = useState(0);

  return (
    <>
      <div>
        {number} | {a} |
        <br />
      </div>
      <br />
      {/* <span onClick={() => setB(555)}>111</span> */}
    </>
  );
};

export default Box;
