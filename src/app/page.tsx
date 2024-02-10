"use client";
import { useQuery } from "react-query";
import { PostType, postList } from "./postApi";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect } from "react";

import { Bounce, Zoom, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Select from "react-select";

export default function Home() {
  //const [loading, setLoading] = useState<boolean>(false);
  //const [erroring, setErroring] = useState<boolean>(false);

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

  const {
    data: postData,
    isLoading: postIsLoading,
    isError: postIsError,
    error: postError,
  } = useQuery<PostType[], Error>({
    queryKey: ["postList"],
    queryFn: function () {
      return postList("https://jsonplaceholder.typicode.com/posts");
    },
    staleTime: 2000,
  });

  const [items, setItems] = useState<number[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    fetchData(1);
  }, []);

  const fetchData = (page: number): void => {
    setTimeout(function () {
      const newItems: number[] = [];

      for (let i = 0; i < 20; i++) {
        newItems.push(i);
      }

      if (page === 5) {
        setHasMore(false);
      }

      setItems((prevItems) => [...prevItems, ...newItems]);
    }, 2000);
  };

  type optionProps = { value: string; label: string };

  const options: optionProps[] = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const [selectedOption, setSelectedOption] = useState<optionProps | null>(
    null
  );

  return (
    <>
      <button onClick={notify}>Notify !</button>
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
      <br />
      {postIsLoading && <div>Loading</div>}
      {/* {postIsError && <div>An error occurred: {postError.message}</div>} */}
      <main className="flex">
        <div className="w-1/2">
          <h1>List</h1>
          <br />
          <Select
            defaultValue={selectedOption}
            onChange={(newValue: optionProps | null) =>
              setSelectedOption(newValue)
            }
            options={options}
          />
          <br />
          <input type="text" />
          <br />
          {postData?.map((list) => (
            <div key={list.id} className="border border-red-500 mt-2">
              <div>{list.title}</div>
              <div>{list.body}</div>
              <br />
              <div>
                <button
                  onClick={(event) => {
                    console.log(event);
                  }}
                >
                  Click
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-20 pl-10 w-10">
          <br />
          <br />
          {items.length}
          <InfiniteScroll
            dataLength={items.length}
            next={() => fetchData(Math.floor(items.length / 100) + 1)}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            initialScrollY={300}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
            height={300}
            className="overflow-y bg-red-400 w-36"
          >
            {items.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </InfiniteScroll>

          <div className="w-36 h-32 bg-red-400 overflow-hidden hover:overflow-y-scroll custom-scroll">
            11111111
            <br />
            11111111
            <br />
            11111111
            <br />
            11111111
            <br />
            11111111
            <br />
            11111111
            <br />
            11111111
            <br />
            11111111
            <br />
            11111111
            <br />
            11111111
            <br />
            11111111
            <br />
            11111111
            <br />
            11111111
            <br />
            11111111
            <br />
            11111111
            <br />
            11111111
            <br />
            11111111
            <br />
            11111111
            <br />
            11111111
            <br />
            11111111
            <br />
            11111111
            <br />
            11111111
            <br />
            11111111
            <br />
            11111111
            <br />
            11111111
            <br />
            11111111
            <br />
            11111111
            <br />
            11111111
            <br />
            11111111
            <br />
            11111111
            <br />
          </div>
        </div>
      </main>
    </>
  );
}
