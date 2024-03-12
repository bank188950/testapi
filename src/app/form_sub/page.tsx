"use client";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
// import { DevTool } from "@hookform/devtools";
import React, { useState, useEffect } from "react";
import AddFrom from "./component/AddFrom";

export type FromType = {
  fullname: string;
  nickname: string;
  email: string;
  tel: string;
  province: string;
  password: string;
  confirmPassword: string;
  check: string[];
  choose: string;
  otherDetail: string;
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
  province: {
    required: { value: true, message: "กรุณาเลือกจังหวัด" },
  },
  password: {
    required: { value: true, message: "กรุณากรอกรหัสผ่าน" },
    minLength: { value: 6, message: "รหัสผ่านต้องมากกว่า 6 ตัวอักษร" },
  },
  confirmPassword: {
    required: { value: true, message: "กรุณากรอกยืนยันรหัสผ่าน" },
    validate: (value: string, formValue: FromType) => {
      return value === formValue.password || "รหัสผ่านไม่ตรงกัน";
    },
  },
  check: {
    required: { value: true, message: "กรุณาเลือกงานอดิเรก" },
  },
  choose: {
    required: { value: true, message: "กรุณาเลือกเพศ" },
  },
  otherDetail: {
    required: { value: true, message: "กรุณากรอกรายละเอียดเพิ่มเติม" },
  },
};

export default function From() {
  const handleSave: SubmitHandler<FromType> = (data) => {
    console.log(data);
    console.log("save data");
  };

  const handleSaveDraft = async () => {
    const data = getValues();
    console.log(data);
    console.log("save draft data");
    clearErrors();
  };

  function messageError(field: keyof FromType): React.ReactNode {
    return (
      errors[field] && (
        <span className="text-red-500">{errors[field]?.message as string}</span>
      )
    );
  }

  const methods = useForm<FromType>({
    defaultValues: {
      fullname: "",
      nickname: "",
      email: "",
      check: ["อ่านหนังสือ"],
      choose: "ชาย",
    },
  });

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    clearErrors,
    getFieldState,
    formState: { errors },
    trigger,
  } = methods;

  useEffect(() => {
    //trigger();
    //trigger("province");
  }, []);

  useEffect(() => {
    //setValue("fullname", "ภานุพงศ์");
    // setValue("email", "spike_hammer@hotmail.com");
  }, []);

  return (
    <>
      <FormProvider {...methods}>
        <h1 className="text-3xl mb-4">From</h1>
        <p className="p-4">
          Show watch {`${watch("fullname")} ${watch("nickname")}`}
        </p>
        <form onSubmit={handleSubmit(handleSave)} noValidate>
          <div className="w-1/2">
            <div className="w-80 mt-4">
              <select
                className="bg-white border border-solid border-gray-500 w-full p-2"
                id="province"
                {...register("province", fieldValidate.province)}
              >
                <option value="">เลือกจังหวัด</option>
                <option value="1">กรุงเทพ</option>
                <option value="2">นครราชสีมา</option>
                <option value="3">เชียงใหม่</option>
                <option value="4">ขอนแก่น</option>
              </select>
            </div>

            {messageError("province")}

            <div className="border border-solid border-gray-500 w-80">
              <input
                id="fullname"
                {...register("fullname", fieldValidate.fullname)}
                className="w-full"
                placeholder="ชื่อ-สกุล"
              />
            </div>
            {messageError("fullname")}

            <div className="border border-solid border-gray-500 w-80">
              <input
                id="nickname"
                {...register("nickname", fieldValidate.nickname)}
                className="w-full"
                placeholder="ชื่อเล่น"
              />
            </div>
            {messageError("nickname")}

            <div className="border border-solid border-gray-500 w-80  mt-4">
              <input
                id="email"
                {...register("email", fieldValidate.email)}
                className="w-full"
                placeholder="อีเมล"
              />
            </div>
            {messageError("email")}

            <div className="border border-solid border-gray-500 w-80  mt-4">
              <input
                id="tel"
                {...register("tel", fieldValidate.tel)}
                className="w-full"
                placeholder="เบอร์โทร"
              />
            </div>

            {messageError("tel")}

            <div className="border border-solid border-gray-500 w-80 mt-4">
              <input
                id="password"
                {...register("password", fieldValidate.password)}
                className="w-full"
                placeholder="รหัสผ่าน"
              />
            </div>

            {messageError("password")}

            <div className="border border-solid border-gray-500 w-80 mt-4">
              <input
                id="confirmPassword"
                {...register("confirmPassword", fieldValidate.confirmPassword)}
                className="w-full"
                placeholder="ยืนยันรหัสผ่าน"
              />
            </div>

            {messageError("confirmPassword")}

            <div className="w-80 mt-4">
              <span>อ่านหนังสือ</span>
              <input
                type="checkbox"
                value="อ่านหนังสือ"
                {...register("check", fieldValidate.check)}
              />
              <span className="ml-4">เล่นเกม</span>
              <input
                type="checkbox"
                value="เล่นเกม"
                {...register("check", fieldValidate.check)}
              />
              <span className="ml-4">เล่นกีฬา</span>
              <input
                type="checkbox"
                value="เล่นกีฬา"
                {...register("check", fieldValidate.check)}
              />
            </div>

            {messageError("check")}

            <div className="w-80 mt-4">
              <span>ชาย</span>
              <input
                type="radio"
                value="ชาย"
                {...register("choose", fieldValidate.choose)}
              />
              <span className="ml-4">หญิง</span>
              <input
                type="radio"
                value="หญิง"
                {...register("choose", fieldValidate.choose)}
              />
            </div>

            {messageError("choose")}

            <AddFrom messageError={messageError} />

            <div className="mt-4">
              <input
                type="submit"
                className="cursor-pointer bg-blue-500 p-4"
                value="save"
              />

              <input
                type="button"
                className="cursor-pointer bg-gray-500 p-4 ml-4"
                value="savedraft"
                onClick={handleSaveDraft}
              />
            </div>
          </div>
        </form>
      </FormProvider>

      {/* <DevTool control={control} placement="top-right" /> */}
    </>
  );
}
