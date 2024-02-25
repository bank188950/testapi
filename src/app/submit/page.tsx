"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const schema = z.object({
  name: z.string().min(3, "ชื่อต้องมีอย่างน้อย 3 ตัวอักษร"),
  email: z.string().email("อีเมลไม่ถูกต้อง"),
  password: z.string().min(8, "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร"),
});

export default function Submit() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log("ข้อมูลฟอร์มที่ถูกต้อง:", data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("name")}
          className="border border-solid border-red-500"
        />
        {errors.name && <p className="error-message">{errors.name.message}</p>}
        <br />

        <input
          {...register("email")}
          className="border border-solid border-red-500"
        />
        {errors.email && (
          <p className="error-message">{errors.email.message}</p>
        )}
        <br />

        <input
          {...register("password")}
          className="border border-solid border-red-500"
        />
        {errors.password && (
          <p className="error-message">{errors.password.message}</p>
        )}
        <br />

        <button type="submit">ส่งข้อมูล</button>
      </form>
    </>
  );
}
