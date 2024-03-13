"use client";
import { useState, useEffect } from "react";
import Select from "react-select";

export default function Filter() {
  const [keyword, setKeyword] = useState("");
  const [change, setChange] = useState("");

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  useEffect(
    function () {
      console.log("111");
    },
    [keyword]
  );

  return (
    <>
      <Select
        options={options}
        onInputChange={(result) => {
          setKeyword(result);
        }}
      />

      <br />
      <br />
      <br />
      <button onClick={() => setChange("tttt")}>C</button>
      {change}
      <br />
      {keyword}
      <div className="w-1/2">
        <input
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
          className="border border-gray-500"
        />
      </div>
    </>
  );
}
