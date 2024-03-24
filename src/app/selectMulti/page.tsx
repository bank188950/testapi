"use client";

import React from "react";

import Select, { components, OptionProps } from "react-select";

type ColourOption = {
  readonly value: string;
  readonly label: string;
};

const colourOptions: ColourOption[] = [
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

const CheckboxOption = ({ ...props }: OptionProps<ColourOption>) => (
  <components.Option {...props}>
    <input id={props.label} type="checkbox" checked={props.isSelected} />
    <label htmlFor={props.label}>{props.label}</label>
  </components.Option>
);

export default function Blog() {
  return (
    <Select
      isMulti
      defaultValue={[colourOptions[1]]}
      name="colors"
      options={colourOptions}
      hideSelectedOptions={false}
      closeMenuOnSelect={false}
      components={{ Option: CheckboxOption }}
    />
  );
}
