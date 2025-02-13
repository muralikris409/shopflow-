import { NextResponse } from "next/server";
export function middleware(req) {
  console.log("Middleware triggered");
  console.log("Requested URL:", req.nextUrl.pathname);
  console.log("Cookies:", req.cookies.getAll());
  
  const session = req.cookies.get("shopflow_session")?.value;

  if (!session) {
    console.log("Session not found, redirecting to /auth");
    const url = req.nextUrl.clone();
    url.pathname = "/auth";
    return NextResponse.redirect(url);
  }
  console.log("Session exists, proceeding...");
  return NextResponse.next();
}


export const config = {
  matcher: [
    "/orders/:path*", 
    "/checkout",
    "/checkout/:path*", 
    "/wishlist",
    "/user/:path",
  ],
};
