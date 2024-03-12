"use client";
import { useFormContext } from "react-hook-form";

import { fieldValidate } from "../page";
import { FromType } from "../page";

type messageErrorType = {
  messageError: (field: keyof FromType) => React.ReactNode;
};

export default function AddFrom({ messageError }: messageErrorType) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <div className="border border-solid border-gray-500 w-80 mt-4">
        <input
          id="addName"
          {...register("otherDetail", fieldValidate.otherDetail)}
          className="w-full"
          placeholder="รายละเอียดเพิ่มเติ่ม"
        />
      </div>
      {messageError("otherDetail")}
    </>
  );
}
