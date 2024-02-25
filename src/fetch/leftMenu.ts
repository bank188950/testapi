export async function fetchProfileAuth() {
  const response = await fetch("api/hello");
  const data = await response.json();

  console.log("Public: ", process.env.NEXT_PUBLIC_CLIENT_ID, data.message);
  return data;
}
