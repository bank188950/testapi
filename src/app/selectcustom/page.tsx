"use client";

import dynamic from "next/dynamic";
import Select, { StylesConfig } from "react-select";

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

const customStyles: StylesConfig<ColourOption> = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: "#f6f6f6",
    borderRadius: 8,
    boxShadow: "none",
    borderColor: state.isFocused ? "blue !important" : "gray !important",
  }),
  option: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: state.isFocused ? "pink !important" : "",
    color: state.isFocused ? "#333333" : "#FFFFFF",
  }),
  menu: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: "brown",
  }),
};

export default function Blog() {
  return (
    <>
      <div className="w-1/2">
        <Select
          instanceId={`search`}
          options={colourOptions}
          styles={customStyles}
          id="box1"
        />
      </div>
      <br />
      <br />
      <br />
      <br />
      <div className="w-1/2">
        <Select
          instanceId={`search`}
          options={colourOptions}
          styles={customStyles}
          id="box1"
        />
      </div>
    </>
  );
}
