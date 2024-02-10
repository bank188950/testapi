"use client";
import Image from "next/image";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

function Dropzone() {
  const [images, setImages] = useState<File[]>([]);
  const onDrop = useCallback(function (acceptedFiles: File[]) {
    setImages((prevImages) => [...prevImages, ...acceptedFiles]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <>
      <div
        {...getRootProps()}
        className={`w-36 h-36 border border-dashed rounded-xl flex justify-center items-center cursor-pointer
        ${
          isDragActive
            ? "border-blue-400 bg-blue-200"
            : "border-gray-400 bg-gray-200"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center">
          <span className="text-[40px] leading-3">+</span>
          <span className="text-lg mt-4">Upload</span>
        </div>
      </div>

      {images.map((image, index) => (
        <div
          key={index}
          className="bg-gray-200 w-36 h-36 border border-dashed border-gray-400 rounded-xl flex justify-center items-center overflow-hidden relative"
        >
          <div className="absolute right-2 top-2 z-10 text-lg w-6 h-6 rounded-full bg-red-500 flex justify-center items-center">
            <span className="text-white cursor-pointer">x</span>
          </div>
          <Image
            src={URL.createObjectURL(image)}
            alt={`uploaded-${index}`}
            fill
          />
        </div>
      ))}
    </>
  );
}

export default function Upload() {
  return (
    <div className="flex flex-wrap gap-4 w-1/2 bg-gray-50 border border-dashed border-gray-400 rounded-xl p-6">
      <Dropzone />
    </div>
  );
}
