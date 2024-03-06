"use client";

import dynamic from "next/dynamic";
//import AsyncSelect from "react-select/async";
const AsyncSelect = dynamic(() => import("react-select/async"), { ssr: false });

type ColourOption = {
  readonly value: string;
  readonly label: string;
};

const colourOptions: ColourOption[] = [
  { value: "", label: "กรุณาเลือกข้อมูล" },
  { value: "ocean", label: "Ocean" },
  { value: "blue", label: "Blue" },
  { value: "purple", label: "Purple" },
  { value: "red", label: "Red" },
  { value: "orange", label: "Orange" },
  { value: "yellow", label: "Yellow" },
  { value: "green", label: "Green" },
  { value: "forest", label: "Forest" },
  { value: "slate", label: "Slate" },
  { value: "silver", label: "Silver" },
];

export default function Blog() {
  const filterColors = (inputValue: string) => {
    return colourOptions.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadOptions = (
    inputValue: string,
    callback: (options: ColourOption[]) => void
  ) => {
    setTimeout(() => {
      callback(filterColors(inputValue));
    }, 1000);
  };

  return (
    <div className="w-1/2">
      <AsyncSelect cacheOptions loadOptions={loadOptions} defaultOptions />
      <br />
      <br />
    </div>
  );
}
