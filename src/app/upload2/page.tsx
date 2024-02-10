"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const MultiUploadImage: React.FC = () => {
  const [images, setImages] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    setImages((prevImages) => [...prevImages, ...acceptedFiles]);
  }, []);

  const onImageDelete = (index: number) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const updatedImages = [...images];
    const [reorderedImage] = updatedImages.splice(result.source.index, 1);
    updatedImages.splice(result.destination.index, 0, reorderedImage);
    setImages(updatedImages);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <div {...getRootProps()} style={dropzoneStyles}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here...</p>
          ) : (
            <p>Drag drop some files here, or click to select files</p>
          )}
        </div>
        <Droppable droppableId="images">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {images.map((image, index) => (
                <Draggable
                  key={index}
                  draggableId={`image-${index}`}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div style={imageContainerStyles}>
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`uploaded-${index}`}
                          style={imageStyles}
                        />
                        <div>
                          <button onClick={() => onImageDelete(index)}>
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

const dropzoneStyles: React.CSSProperties = {
  border: "2px dashed #aaaaaa",
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
};

const imageContainerStyles: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  marginBottom: "10px",
};

const imageStyles: React.CSSProperties = {
  maxWidth: "100px",
  maxHeight: "100px",
  margin: "0 10px 0 0",
};

export default function Upload() {
  return (
    <div>
      <h1>Multi Upload Image using Dropzone</h1>
      <MultiUploadImage />
    </div>
  );
}
