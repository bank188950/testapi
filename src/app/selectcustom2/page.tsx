"use client";

import React, { useState } from "react";
import Select, { StylesConfig, components } from "react-select";
import { IoIosArrowDown } from "react-icons/io";

type ColourOption = {
  readonly value: string;
  readonly label: string;
};

const colourOptions: ColourOption[] = [
  { value: "", label: "กรุณาเลือกข้อมูล" },
  { value: "Ocean", label: "Ocean" },
  { value: "Blue", label: "Blue" },
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
    borderRadius: "10px",
    boxShadow: "none",
    borderColor: state.isFocused ? "#1a93de" : "gray",
    "&:hover": {
      borderColor: "gray",
    },
    height: "45px",
  }),
  input: (baseStyles, state) => ({
    ...baseStyles,
    color: "black",
  }),
  option: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: state.isFocused ? "#57a0ff" : "",
    "&:active": {
      color: "#ffffff",
      backgroundColor: "#57a0ff",
    },
    padding: "3px 16px",
    color: state.isFocused ? "#ffffff" : "#000000",
    borderRadius: "6px",
  }),
  menu: (baseStyles) => ({
    ...baseStyles,
    padding: "6px",
    backgroundColor: "#e2e2e2",
    border: "#bababa",
    borderRadius: "6px",
  }),
  placeholder: (baseStyles) => ({
    ...baseStyles,
    fontSize: "1em",
    color: "#6d6d6d",
    fontWeight: 400,
  }),
  indicatorSeparator: (baseStyles) => ({
    ...baseStyles,
    opacity: 0,
  }),
  dropdownIndicator: (baseStyles) => ({
    ...baseStyles,
    color: "black",
    "&:hover": {
      color: "black",
    },
    "&>svg": {
      width: "25px",
      height: "25px",
    },
  }),
  noOptionsMessage: (baseStyles) => ({
    ...baseStyles,
    color: "black",
  }),
};

export default function Blog() {
  const handleColorData = function () {
    setColorData([
      { value: "", label: "กรุณาเลือกข้อมูล" },
      { value: "ocean", label: "Ocean" },
      { value: "blue", label: "Blue" },
    ]);
  };

  const [colorData, setColorData] = useState(colourOptions);

  return (
    <>
      <button
        onClick={() => {
          handleColorData();
        }}
      >
        Change Data
      </button>
      <div className="w-1/2">
        <Select
          id="box1"
          instanceId={`search`}
          options={colorData}
          styles={customStyles}
          components={{
            Input: (props) => (
              <components.Input {...props} aria-activedescendant={undefined} />
            ),
          }}
          onChange={() => {
            handleColorData();
          }}
        />
      </div>
      <br />
      <br />
      <br />
      <h3>Have Search</h3>
      <div className="w-1/2">
        <Select
          id="box1"
          instanceId={`search`}
          options={colourOptions}
          styles={customStyles}
          components={{
            Input: (props) => (
              <components.Input {...props} aria-activedescendant={undefined} />
            ),
          }}
        />
      </div>
      <br />
      <br />
      <br />
      <br />
      <div className="relative w-1/2">
        <div className="absolute right-1 top-1 w-8 bottom-1 bg-gray-50 rounded-xl">
          <IoIosArrowDown
            color="black"
            size={23}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </div>
        <select className="rounded-xl bg-gray-50 w-full px-2 py-3 outline-none border-solid border border-gray-500 focus:border-blue-500 ">
          <option>11111</option>
          <option>22222</option>
        </select>
      </div>

      <br />
      <br />
      <br />
      <br />
      <h3>Multi Search</h3>
      <div className="w-1/2">
        <label>
          <Select
            id="box2"
            instanceId={`search`}
            options={colourOptions}
            styles={customStyles}
            components={{
              Input: (props) => (
                <components.Input
                  {...props}
                  aria-activedescendant={undefined}
                />
              ),
            }}
            isMulti={true}
            // isSearchable={false}
            // isDisabled={true}
          />
        </label>
      </div>
    </>
  );
}
