"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const MultiUploadImage: React.FC = () => {
  const [images, setImages] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    setImages((prevImages) => [...prevImages, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*" as Accept,
  });

  return (
    <div>
      <div {...getRootProps()} style={dropzoneStyles}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      <div>
        {images.map((image, index) => (
          <img
            key={index}
            src={URL.createObjectURL(image)}
            alt={`uploaded-${index}`}
            style={imageStyles}
          />
        ))}
      </div>
    </div>
  );
};

const dropzoneStyles: React.CSSProperties = {
  border: "2px dashed #aaaaaa",
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
};

const imageStyles: React.CSSProperties = {
  maxWidth: "100px",
  maxHeight: "100px",
  margin: "10px",
};

export default function Upload() {
  return <div className="w-1/2"></div>;
}
