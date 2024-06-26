"use client";

import { Bounce, Zoom, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useWindowSize } from "@uidotdev/usehooks";

export default function Home() {
  const notify = () => {
    toast.success("🦄 Wow so easy!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }; //

  const size = useWindowSize();

  return (
    <>
      <span>
        {size.width} | {size.height}
      </span>
      <main>
        <button className="p-4 bg-red-500" onClick={notify}>
          Notify !
        </button>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </main>
    </>
  );
}
