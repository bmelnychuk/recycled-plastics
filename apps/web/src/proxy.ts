import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/demand',
  '/supply',
  '/companies(.*)/demand(.*)',
  '/companies(.*)/supply(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    const homeUrl = new URL('/', req.url).toString();
    await auth.protect({
      unauthenticatedUrl: homeUrl,
      unauthorizedUrl: homeUrl,
    });
  }
});

export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)', // Don't run middleware on static files
    '/', // Run middleware on index page
    '/(api|trpc)(.*)', // Run middleware on API routes
  ],
};
