"use client";

import { stat } from "fs";
import React, { use, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ReactSortable } from "react-sortablejs";

type ItemType = {
  id: number;
  name: string;
};

export default function App() {
  const [userState, userSetState] = useState<ItemType[]>([
    { id: 1, name: "shrek" },
    { id: 2, name: "fiona" },
    { id: 3, name: "bank" },
    { id: 4, name: "jang" },
  ]);

  function changeIds(array: ItemType[], startingId = 1) {
    return array.map((item: ItemType, index: number) => {
      return { id: startingId + index, name: item.name };
    });
  }

  function handleDeletePicture(id: number) {
    userSetState((prev) =>
      changeIds(prev.filter((item: ItemType) => item.id !== id))
    );
  }

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.map((file) => {
      userSetState((prev) => {
        if (prev.length >= 10) return prev; // ถ้ามีไฟล์มากกว่า 10 ไฟล์ ให้ไม่เพิ่มได้

        const newFiles = [
          {
            id: prev.length + 1,
            name: file.name,
            chosen: false,
            selected: false,
          },
        ];

        return [...prev, ...newFiles]; // ถ้ามีไฟล์น้อยกว่า 10 ไฟล์ ให้เพิ่มได้
      });
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    //maxFiles: 5,
    accept: {
      "image/*": [".jpg", ".jpeg", ".png"],
    },
    disabled: userState.length >= 10,
  });

  return (
    <>
      <div className="w-full bg-gray-50 border border-dashed border-gray-400 rounded-xl p-4 relative">
        <div
          {...getRootProps()}
          className={`w-36 h-36 border border-dashed rounded-xl flex justify-center items-center absolute top-4 left-4 cursor-pointer
        ${
          userState.length >= 10
            ? "border-red-400 bg-red-200"
            : isDragActive
            ? "border-blue-400 bg-blue-200"
            : "border-gray-400 bg-gray-200"
        }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center">
            <span className="text-[40px] leading-3">+</span>
            <span className="text-lg mt-4">Upload</span>
            <span className="text-red-500 text-center text-sm">
              (สามารถเพิ่มไฟล์ได้สูงสุด 10 ไฟล์)
            </span>
          </div>
        </div>

        <ReactSortable
          list={userState}
          setList={userSetState}
          className="flex flex-wrap gap-4 min-h-72"
          onEnd={(evt) => {
            console.log(evt);
          }}
        >
          {userState.map((item) => (
            <div
              className="cursor-move bg-gray-200 first:ml-40 w-36 h-36 border border-dashed border-gray-400 rounded-xl flex justify-center items-center overflow-hidden relative"
              key={item.id}
            >
              <div
                className="absolute right-2 top-2 z-10 text-lg w-6 h-6 rounded-full bg-red-500 flex justify-center items-center"
                onClick={() => {
                  handleDeletePicture(item.id);
                }}
              >
                <span className="text-white cursor-pointer">x</span>
              </div>
              <span className="text-lg">{item.name}</span>
            </div>
          ))}
        </ReactSortable>
      </div>
    </>
  );
}
