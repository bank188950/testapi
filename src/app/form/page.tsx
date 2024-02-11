"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type FromType = {
  fullname: string;
  email: string;
  tel: string;
};

export default function From() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FromType>();
  const onSubmit: SubmitHandler<FromType> = (data) => console.log(data);

  return (
    <>
      <h1 className="text-3xl mb-4">From</h1>
      <p className="p-4">Show watch {watch("fullname")}</p>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="w-1/2">
          <div className="border border-solid border-gray-500 w-80">
            <input
              //defaultValue="test"
              {...register("fullname", {
                required: { value: true, message: "กรุณากรอกชื่อ" },
              })}
              className="w-full"
              placeholder="ชื่อ-สกุล"
            />
          </div>

          {errors.fullname && (
            <span className="text-red-500">{errors.fullname?.message}</span>
          )}

          <div className="border border-solid border-gray-500 w-80  mt-4">
            <input
              {...register("email", {
                required: { value: true, message: "กรุณากรอกอีเมล" },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "กรอกรูปแบบอีเมลไม่ถูกต้อง",
                },
              })}
              className="w-full"
              placeholder="อีเมล"
            />
          </div>

          {errors.email && (
            <span className="text-red-500">{errors.email?.message}</span>
          )}

          <div className="border border-solid border-gray-500 w-80  mt-4">
            <input
              {...register("tel", {
                required: { value: true, message: "กรุณากรอกเบอร์โทร" },
                pattern: {
                  value: /^[0-9]{10}$/i,
                  message: "กรอกรูปแบบเบอร์โทรไม่ถูกต้อง",
                },
              })}
              className="w-full"
              placeholder="เบอร์โทร"
            />
          </div>

          {errors.tel && (
            <span className="text-red-500">{errors.tel?.message}</span>
          )}

          <div className="mt-4">
            <input type="submit" className="bg-blue-500 p-4" />
          </div>
        </div>
      </form>
      <DevTool control={control} placement="top-right" />
    </>
  );
}
