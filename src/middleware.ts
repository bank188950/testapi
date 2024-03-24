import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import apiService from "./utils/apiService";

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const pathname = request.nextUrl.pathname;
  const accessToken = cookies().get("accessToken")?.value ?? "";

  if (pathname === "/access-denied") {
    return NextResponse.next();
  } else if (pathname === "/") {
    return NextResponse.next();
  } else {
    return NextResponse.next();
  }
}

// The page route must match paths below

export const config = {
  matcher: "/((?!api|_next/static|_next/image|images|lang|favicon.ico).*)",
};
