import { auth } from '@clerk/nextjs/server';
import { Application, SignedInUser, SignedInUserSchema } from '@rp/core';

export const { MAIN_TABLE } = process.env as Record<string, string>;

const getCurrentUser = async (): Promise<SignedInUser | undefined> => {
  const clerkAuth = await auth();
  if (!clerkAuth.isAuthenticated) return undefined;
  const { sessionClaims } = clerkAuth;
  console.log(clerkAuth);

  return SignedInUserSchema.safeParse({
    authId: clerkAuth.userId,
    id: sessionClaims?.externalId,
    isAdmin: sessionClaims?.role === 'admin',
  }).data;
};

export const application = new Application(MAIN_TABLE, getCurrentUser);
