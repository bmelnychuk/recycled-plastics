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

// export all functions from the application (bound to preserve `this`)
export const getActiveDemand = application.getActiveDemand.bind(application);
export const getDemandById = application.getDemandById.bind(application);
export const updateDemand = application.updateDemand.bind(application);
export const createDemand = application.createDemand.bind(application);
export const getCompanyDemand = application.getCompanyDemand.bind(application);
export const getUnverifiedDemand = application.getUnverifiedDemand.bind(application);
export const getActiveSupply = application.getActiveSupply.bind(application);
export const getSupplyById = application.getSupplyById.bind(application);
export const updateSupply = application.updateSupply.bind(application);
export const createSupply = application.createSupply.bind(application);
export const getCompanySupply = application.getCompanySupply.bind(application);
export const getUnverifiedSupply = application.getUnverifiedSupply.bind(application);
export const getCompanyById = application.getCompanyById.bind(application);
export const updateCompany = application.updateCompany.bind(application);
export const createCompany = application.createCompany.bind(application);
export const updateCurrentCompany = application.updateCurrentCompany.bind(application);
export const getVerifiedCompanies = application.getVerifiedCompanies.bind(application);
export const getUnverifiedCompanies = application.getUnverifiedCompanies.bind(application);
export const getCurrentCompany = application.getCurrentCompany.bind(application);
export const getAllCompanies = application.getAllCompanies.bind(application);
