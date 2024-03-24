// "use client";
// import React, { useState, useEffect } from "react";

// export default function Form() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       //  const response = await fetch("/api/hello", config);

//       const response = await fetch(
//         "https://jsonplaceholder.typicode.com/posts"
//       );

//       const data = await response.json();

//       setData(data);
//     };
//     fetchData();
//   }, []);

//   return (
//     <>{data && data.map((item) => <div key={item.id}>{item.title}</div>)}</>
//   );
// }

"use client";
import React, { useState, useEffect } from "react";

export default function Form() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      //  const response = await fetch("/api/hello", config);

      const response = await fetch("api/hello");

      const data = await response.json();

      setData(data);
    };
    fetchData();
  }, []);

  return <></>;
}
