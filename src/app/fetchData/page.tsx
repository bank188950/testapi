"use client";
import Show from "./component/show";
import Show2 from "./component/show2";
import React, { useState } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";

export type FromType = {
  fullname: string;
  nickname: string;
  email: string;
  tel: string;
};

export const fieldValidate = {
  fullname: {
    required: { value: true, message: "กรุณากรอกชื่อ" },
  },
  nickname: {
    required: { value: true, message: "กรุณากรอกชื่อเล่น" },
  },
  email: {
    required: { value: true, message: "กรุณากรอกอีเมล" },
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      message: "กรอกรูปแบบอีเมลไม่ถูกต้อง",
    },
  },
  tel: {
    required: { value: true, message: "กรุณากรอกเบอร์โทร" },
    pattern: {
      value: /^[0-9]{10}$/i,
      message: "กรอกรูปแบบเบอร์โทรไม่ถูกต้อง",
    },
  },
};

const FetchPage = () => {
  const [loadContetTab, setLoadContetTab] = useState<number[] | []>([1]);

  const [stateTab, setStateTab] = useState(1);

  const methods = useForm<FromType>({
    defaultValues: {
      fullname: "fullname initial",
      nickname: "",
      email: "",
      tel: "0822867567",
    },
  });

  const {
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;

  function handleSave(data: FromType): void {
    console.log(data);
    console.log("save data");
  }

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleSave)} noValidate>
          <button type="submit" className="border border-red-500">
            Submit
          </button>
          <ul>
            {watch("fullname")}
            {watch("tel")}

            {errors.fullname && <p>{errors.fullname.message}</p>}
            {errors.tel && <p>{errors.tel.message}</p>}
            <br />
            <br />
            <li
              onClick={() => {
                if (!loadContetTab.includes(1 as never)) {
                  setLoadContetTab([...loadContetTab, 1]);
                }

                setStateTab(1);
              }}
            >
              111
            </li>
            <li
              onClick={() => {
                if (!loadContetTab.includes(2 as never)) {
                  setLoadContetTab([...loadContetTab, 2]);
                }
                setStateTab(2);
              }}
            >
              222
            </li>
          </ul>
          {loadContetTab.includes(1 as never) && (
            <div className={stateTab === 1 ? "not-sr-only" : "sr-only"}>
              <Show />
            </div>
          )}

          {loadContetTab.includes(2 as never) && (
            <div className={stateTab === 2 ? "not-sr-only" : "sr-only"}>
              <Show2 />
            </div>
          )}
        </form>
      </FormProvider>
    </>
  );
};

export default FetchPage;
