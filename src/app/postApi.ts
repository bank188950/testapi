export type PostType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export async function postList(url: string): Promise<PostType[]> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
}
