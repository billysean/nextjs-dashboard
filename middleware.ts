import { authMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
export default authMiddleware({
  publicRoutes: ['/'],
  afterAuth(auth, req) {
    if (auth.userId && auth.isPublicRoute) {
      let path = '/select-org'
      if (auth.orgId) {
        path = `/organization/${auth.orgId}`
      }
      const orgSelection = new URL(path, req.url)
      return NextResponse.redirect(orgSelection)
    }
    if (!auth.userId && !auth.isPublicRoute) {
      return NextResponse.redirect(new URL('/sign-in', req.url))
    }
    if (auth.userId && !auth.orgId && req.nextUrl.pathname !== '/select-org') {
      return NextResponse.redirect(new URL('/select-org', req.url))
    }
  }
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};  