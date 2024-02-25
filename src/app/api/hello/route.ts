import { NextApiRequest, NextApiResponse } from "next";

export function GET(req: NextApiRequest, res: NextApiResponse) {
  console.log("Private: " + process.env.NEXT_PUBLIC_POST_LOGOUT_REDIRECTURI);
  return Response.json({ message: "Hello, world!" });
}
