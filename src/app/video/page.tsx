"use client";
import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
// Render a YouTube video player

export default function Video() {
  const [componentMount, setComponentMount] = useState(false);
  useEffect(() => {
    setComponentMount(true);
  }, []);
  return (
    <>
      {componentMount && (
        // <ReactPlayer url="https://www.youtube.com/watch?v=LXb3EKWsInQ" />
        <ReactPlayer url="http://localhost:3000/video.mp4" controls />
      )}
    </>
  );
}
