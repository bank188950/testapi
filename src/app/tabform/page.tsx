"use client";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
// import { DevTool } from "@hookform/devtools";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

//import Select from "react-select";
const Select = dynamic(() => import("react-select"), { ssr: false });

type FruitType = {
  readonly value: string;
  readonly label: string;
};

const fruitOptions = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

type FromType = {
  project: string;
  projectName: string;
  ownerName: string;
  colorList: string;
};

export default function From() {
  const fieldValidate = {
    project: {
      required: { value: true, message: "กรุณาเลือกโปรเจค" },
    },
    projectName: {
      required: { value: true, message: "กรุณากรอกชื่อโปรเจค" },
    },
    ownerName: {
      required: { value: true, message: "กรุณากรอกชื่อเจ้าของ" },
    },
    colorList: {
      required: { value: true, message: "กรุณาเลือกสี" },
    },
  };

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
    console.log(errors[field]);

    return (
      errors[field] && (
        <span className="text-red-500">{errors[field]?.message}</span>
      )
    );
  }

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    clearErrors,
    formState: { errors },
    trigger,
  } = useForm<FromType>({
    defaultValues: {
      colorList: "",
      project: "",
      projectName: "",
    },
  });

  const fieldsWatch = watch();

  useEffect(() => {
    //trigger("province");
    //setValue("fullname", "ภานุพงศ์");
  }, []);

  const [stepActive, setStepActive] = useState(0);
  const [progress, setProgress] = useState([
    {
      field: [],
      status: 1,
    },
    {
      field: [],
      status: 0,
    },
    {
      field: [],
      status: 0,
    },
    {
      field: [],
      status: 0,
    },
  ]);

  const [stepCondition, setStepCondition] = useState([
    {
      projectName: 0,
    },
  ]);

  useEffect(() => {
    const fields = watch((field) => {
      // Step 1

      if (stepActive === 0) {
        if (field["project"] === "new") {
          // เปิด project name
          stepCondition[0].projectName = 1;
          setStepCondition([...stepCondition]);

          if (field["projectName"] === "") {
            // ปิด tab ทั้งหมด
            progress[0].status = 1;
            progress[1].status = 0;
            progress[2].status = 0;
            progress[3].status = 0;

            setProgress([...progress]);
          } else {
            // เปิด tab ทั้งหมด
            progress[0].status = 2;
            progress[1].status = 1;
            progress[2].status = 1;
            progress[3].status = 1;
            setProgress([...progress]);
          }
        } else if (field["project"] === "") {
          stepCondition[0].projectName = 0;
          setStepCondition([...stepCondition]);

          // ปิด tab ทั้งหมด
          progress[0].status = 1;
          progress[1].status = 0;
          progress[2].status = 0;
          progress[3].status = 0;
          setProgress([...progress]);
        } else {
          stepCondition[0].projectName = 0;
          setStepCondition([...stepCondition]);

          // เปิด tab ทั้งหมด
          progress[0].status = 2;
          progress[1].status = 1;
          progress[2].status = 1;
          progress[3].status = 1;
          setProgress([...progress]);
        }
      }

      // Step 2
      if (stepActive === 1) {
        if (field["ownerName"] != "") {
          progress[1].status = 2;
          setProgress([...progress]);
        } else {
          progress[1].status = 1;
          setProgress([...progress]);
        }
      }
    });

    return () => fields.unsubscribe();
  }, [fieldsWatch]);

  return (
    <>
      <div className="w-56">
        <div
          className={`relative p-3 shadow-gray-500 shadow-inner ${
            progress[0].status === 0 && "bg-gray-200"
          } ${stepActive === 0 && "border-black border-2"}`}
          onClick={
            progress[0].status !== 0 ? () => setStepActive(0) : undefined
          }
        >
          Step 1
          {progress[0].status === 2 ? (
            <div className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full w-6 h-6 bg-green-400"></div>
          ) : (
            <div className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full w-6 h-6 bg-gray-400"></div>
          )}
        </div>
        <div
          className={`relative mt-1 p-3 shadow-gray-500 shadow-inner ${
            progress[1].status === 0 && "bg-gray-200"
          } ${stepActive === 1 && "border-black border-2"}`}
          onClick={
            progress[1].status !== 0 ? () => setStepActive(1) : undefined
          }
        >
          Step 2
          {progress[1].status === 2 ? (
            <div className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full w-6 h-6 bg-green-400"></div>
          ) : (
            <div className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full w-6 h-6 bg-gray-400"></div>
          )}
        </div>
        <div
          className={`relative mt-1 p-3 shadow-gray-500 shadow-inner ${
            progress[2].status === 0 && "bg-gray-200"
          } ${stepActive === 2 && "border-black border-2"}`}
          onClick={
            progress[2].status !== 0 ? () => setStepActive(2) : undefined
          }
        >
          Step 3
          {progress[2].status === 2 ? (
            <div className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full w-6 h-6 bg-green-400"></div>
          ) : (
            <div className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full w-6 h-6 bg-gray-400"></div>
          )}
        </div>
        <div
          className={`relative mt-1 p-3 shadow-gray-500 shadow-inner ${
            progress[3].status === 0 && "bg-gray-200"
          } ${stepActive === 3 && "border-black border-2"}`}
          onClick={
            progress[3].status !== 0 ? () => setStepActive(3) : undefined
          }
        >
          Step 4
          {progress[3].status === 2 ? (
            <div className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full w-6 h-6 bg-green-400"></div>
          ) : (
            <div className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full w-6 h-6 bg-gray-400"></div>
          )}
        </div>

        <hr />
        <div>
          <form onSubmit={handleSubmit(handleSave)} noValidate>
            <div>
              <input
                type="submit"
                className="cursor-pointer bg-blue-500 p-4"
                value="save"
              />
            </div>

            <div className={`${stepActive === 0 ? "block" : "hidden"}`}>
              <div className="w-80 mt-4">
                <Select
                  options={fruitOptions}
                  onChange={(value) => console.log(value)}
                  value={{ value: "vanilla", label: "Vanilla" }}
                />
                <br />
                <Controller
                  control={control}
                  name="colorList"
                  rules={fieldValidate.colorList}
                  render={({ field: { name, value, onChange, onBlur } }) => {
                    return (
                      <div className="border border-solid border-gray-500 w-80">
                        <input
                          type="text"
                          name={name}
                          value={value}
                          onChange={onChange}
                          onBlur={onBlur}
                          placeholder="สีที่ต้องการ"
                        />
                      </div>
                    );
                  }}
                />

                {messageError("colorList")}
              </div>

              <div className="w-80 mt-4">
                <select
                  className="bg-white border border-solid border-gray-500 w-full p-2"
                  {...register("project", fieldValidate.project)}
                >
                  <option value="">เลือก Project</option>
                  <option value="new">New Project</option>
                  <option value="2">นครราชสีมา</option>
                  <option value="3">เชียงใหม่</option>
                  <option value="4">ขอนแก่น</option>
                </select>
                {messageError("project")}
              </div>
              <div
                className={`w-80 mt-4 ${
                  stepCondition[0].projectName === 0 && "hidden"
                }`}
              >
                <div className="border border-solid border-gray-500 w-80">
                  <input
                    {...register("projectName", fieldValidate.projectName)}
                    className="w-full"
                    placeholder="ชื่อโปรเจค"
                  />
                </div>
                {messageError("projectName")}
                <br />
                <br />
              </div>
            </div>
            <div className={`${stepActive === 1 ? "block" : "hidden"}`}>
              <div className="border border-solid border-gray-500 w-80">
                <input
                  {...register("ownerName", fieldValidate.ownerName)}
                  className="w-full"
                  placeholder="ชื่อเจ้าของ"
                />
              </div>
              {messageError("ownerName")}

              <br />
              <br />
            </div>
            <div className={`${stepActive === 2 ? "block" : "hidden"}`}>
              33333
            </div>
            <div className={`${stepActive === 3 ? "block" : "hidden"}`}>
              44444
            </div>
          </form>
        </div>
      </div>
      <br />
      <br />
      <h1 className="text-3xl mb-4">From</h1>
      <p className="p-4">
        Show watch {`${watch("project")} ${watch("projectName")}`}
      </p>

      {/* <DevTool control={control} placement="top-right" /> */}
    </>
  );
}
