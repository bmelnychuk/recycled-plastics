import z from 'zod';

export const SignedInUserSchema = z.object({
  authId: z.string(),
  id: z.uuid().optional(),
  companyId: z.uuid().optional(),
  isCompanyVerified: z.boolean().optional(),
  isAdmin: z.boolean(),
});

export const SignedInCompanyUserSchema = SignedInUserSchema.extend({
  companyId: z.uuid(),
});

export type SignedInUser = z.infer<typeof SignedInUserSchema>;
export type CompanyUser = z.infer<typeof SignedInCompanyUserSchema>;

export const assertCreateMaterialPermission = (user: SignedInUser): void => {
  assertUserAndCompanyVerified(user);
};

export const assertUserAndCompanyVerified = (user?: SignedInUser): void => {
  if (user?.isAdmin) return;
  if (!user?.companyId) throw new Error('User not associated to a company');
  if (!user?.isCompanyVerified) throw new Error('Company not verified');
};

export const assertCanAccessCompany = (
  user: SignedInUser,
  companyId?: string,
): void => {
  if (user.isAdmin) return;
  if (user.companyId !== companyId)
    throw new Error('User not authorized to access this company');
};

export const assertCompanyUser = (user: SignedInUser): void => {
  if (!user.companyId) throw new Error('User not associated to a company');
};

export const assertUser = (_: SignedInUser): void => {
  return;
};

export const assertIsAdmin = (user: SignedInUser): void => {
  if (user.isAdmin) return;
  throw new Error('Only admins can access this resource');
};

export interface AuthUserUpdatePayload {
  externalId?: string;
  companyId?: string;
  isCompanyVerified?: boolean;
}

export interface AuthService {
  updateUser(authUserId: string, data: AuthUserUpdatePayload): Promise<void>;
}
