"use client";
import React from "react";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: function (error: unknown) {
        //console.log("Error in query:", error);
      },
    },
  },
});

function AppProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ToastContainer />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default AppProvider;
