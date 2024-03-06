import React, { useState, useEffect } from "react";

function Toast({
  message,
  type,
  showToast,
}: {
  message: string;
  type: string;
  showToast: boolean;
}) {
  return (
    <div className={`toast ${type} ${showToast ? "show" : "hide"}`}>
      {message}
    </div>
  );
}

export default Toast;
