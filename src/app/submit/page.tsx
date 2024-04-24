"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { group } from "console";

type FormData = {
  group: string;
  one: string;
  two: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  cfpassword: string;
};

const schema = z
  .object({
    group: z.string(),
    one: z.string(),
    two: z.string(),
    // one: z.string().min(5, { when: (data) => data.group === "A" }),
    // two: z.string().min(5, { when: (data) => data.group === "B" }),
    name: z
      .string({
        errorMap: () => ({
          message: "Name must be between 3 to 20 characters",
        }),
      })
      .min(3)
      .max(20),
    lastname: z.string().min(1, "กรุณากรอกนามสกุลของคุณ"),
    email: z.string().email("อีเมลไม่ถูกต้อง"),
    password: z.string().min(5, "รหัสผ่านต้องมีอย่างน้อย 5 ตัวอักษร"),
    cfpassword: z.string().min(5, "รหัสผ่านต้องมีอย่างน้อย 5 ตัวอักษร"),

    //cfpassword: z.string().min(5, "รหัสผ่านต้องมีอย่างน้อย 5 ตัวอักษร"),
  })
  .refine(
    (data) => {
      return data.password === data.cfpassword;
    },
    {
      message: "รหัสผ่านไม่ตรงกัน",
      path: ["cfpassword"],
    }
  );
// .superRefine((data, ctx) => {
//   if (data.group === "A" && data.one === "") {
//     ctx.addIssue({
//       code: z.ZodIssueCode.custom,
//       path: ["one"],
//       message: "กรุณากรอก one",
//     });
//   } else if (data.group === "B" && data.two === "") {
//     ctx.addIssue({
//       code: z.ZodIssueCode.custom,
//       path: ["two"],
//       message: "กรุณากรอก two",
//     });
//   }
// });

// .refine((data) => {
//   if (data.group === "A") {
//     return z
//       .object({
//         one: z.string().min(1, "Input 1 is required"),
//       })
//       .safeParse(data);
//   } else if (data.group === "B") {
//     return z
//       .object({
//         two: z.string().min(1, "Input 2 is required"),
//       })
//       .safeParse(data);
//   }
//   return true;
// });

// .refine((data) => data.name === "bank1324" && data.lastname === "188950", {
//   message: "user & lastname ผิด",
//   path: ["lastname"],
// });

// const schema = z.object({
//   name: z
//     .string({ invalid_type_error: "Please enter your real name." })
//     .nonempty(),
// });

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
        <select {...register("group")} className="border border-1 border-black">
          <option value="A">Option A</option>
          <option value="B">Option B</option>
        </select>

        {errors.group && (
          <p className="error-message">{errors.group.message}</p>
        )}
        <br />
        <br />

        <input
          {...register("one")}
          className="border border-solid border-red-500"
          placeholder="one"
        />
        {errors.one && <p className="error-message">{errors.one.message}</p>}
        <br />
        <br />

        <input
          {...register("two")}
          className="border border-solid border-red-500"
          placeholder="two"
        />
        {errors.two && <p className="error-message">{errors.two.message}</p>}
        <br />
        <br />

        <input
          {...register("name")}
          className="border border-solid border-red-500"
          placeholder="name"
        />
        {errors.name && <p className="error-message">{errors.name.message}</p>}
        <br />
        <br />

        <input
          {...register("lastname")}
          className="border border-solid border-red-500"
          placeholder="lastname"
        />
        {errors.lastname && (
          <p className="error-message">{errors.lastname.message}</p>
        )}
        <br />
        <br />

        <input
          {...register("email")}
          className="border border-solid border-red-500"
          placeholder="email"
        />
        {errors.email && (
          <p className="error-message">{errors.email.message}</p>
        )}
        <br />
        <br />

        <input
          {...register("password")}
          className="border border-solid border-red-500"
          placeholder="password"
        />
        {errors.password && (
          <p className="error-message">{errors.password.message}</p>
        )}
        <br />
        <br />

        <input
          {...register("cfpassword")}
          className="border border-solid border-red-500"
          placeholder="confirm password"
        />
        {errors.cfpassword && (
          <p className="error-message">{errors.cfpassword.message}</p>
        )}
        <br />
        <br />

        <button type="submit" className="border border-black p-1">
          ส่งข้อมูล
        </button>
      </form>
    </>
  );
}
