import { auth } from '@clerk/nextjs/server';
import { Application, SignedInUser, SignedInUserSchema } from '@rp/core';

import { awsCredentialsProvider } from '@vercel/oidc-aws-credentials-provider';

export const { MAIN_TABLE, IS_LOCAL } = process.env as Record<string, string>;

const verlceDbConfig = {
  region: process.env.AWS_REGION!,
  credentials: awsCredentialsProvider({
    roleArn: process.env.AWS_ROLE_ARN!,
  }),
};

const getCurrentUser = async (): Promise<SignedInUser | undefined> => {
  const clerkAuth = await auth();
  if (!clerkAuth.isAuthenticated) return undefined;
  const { sessionClaims } = clerkAuth;
  
  return SignedInUserSchema.safeParse({
    authId: clerkAuth.userId,
    id: sessionClaims?.externalId,
    isAdmin: sessionClaims?.role === 'admin',
  }).data;
};

export const application = new Application(
  MAIN_TABLE,
  IS_LOCAL === 'true' ? {} : verlceDbConfig,
  getCurrentUser,
);
