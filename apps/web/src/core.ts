'use server';

import { auth } from '@clerk/nextjs/server';
import { Application, SignedInUser, SignedInUserSchema } from '@rp/core';

import { awsCredentialsProvider } from '@vercel/oidc-aws-credentials-provider';

const { MAIN_TABLE, IS_LOCAL } = process.env as Record<string, string>;

const verlceDbConfig = {
  region: process.env.AWS_REGION!,
  credentials: awsCredentialsProvider({
    roleArn: process.env.AWS_ROLE_ARN!,
  }),
};

export const getCurrentUser = async (): Promise<SignedInUser | undefined> => {
  const clerkAuth = await auth();
  if (!clerkAuth.isAuthenticated) return undefined;
  const { sessionClaims } = clerkAuth;

  return SignedInUserSchema.safeParse({
    authId: clerkAuth.userId,
    id: sessionClaims?.externalId,
    isAdmin: sessionClaims?.role === 'admin',
  }).data;
};

const application = new Application(
  MAIN_TABLE,
  IS_LOCAL === 'true' ? {} : verlceDbConfig,
  getCurrentUser,
);

// export all functions from the application
export const {
  getActiveDemand,
  getDemandById,
  updateDemand,
  createDemand,
  getCompanyDemand,
  getUnverifiedDemand,
  getActiveSupply,
  getSupplyById,
  updateSupply,
  createSupply,
  getCompanySupply,
  getUnverifiedSupply,
  getCompanyById,
  updateCompany,
  createCompany,
  updateCurrentCompany,
  getVerifiedCompanies,
  getUnverifiedCompanies,
  getCurrentCompany,
  getAllCompanies,
} = application;
