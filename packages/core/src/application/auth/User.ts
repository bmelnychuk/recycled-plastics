import z from 'zod';
import { PlanTypeSchema } from '../../domain/user/User';

export const UserSchema = z.object({
  authUserId: z.string(),
  id: z.uuid(),
  companyId: z.uuid().optional(),
  isCompanyVerified: z.boolean().optional(),
  isAdmin: z.boolean(),
  plan: PlanTypeSchema,
});

export const CompanyUserSchema = UserSchema.extend({
  companyId: z.uuid(),
});

export type User = z.infer<typeof UserSchema>;
export type CompanyUser = z.infer<typeof CompanyUserSchema>;

export const assertCanUpdateUser = (user: User, userId: string): void => {
  if (user.isAdmin || user.id === userId) return;
  throw new Error('User not authorized to update this user');
};

export const assertCreateMaterialPermission = (user: User): void => {
  assertUserAndCompanyVerified(user);
};

export const assertUserAndCompanyVerified = (user?: User): void => {
  if (user?.isAdmin) return;
  if (!user?.companyId) throw new Error('User not associated to a company');
  if (!user?.isCompanyVerified) throw new Error('Company not verified');
};

export const assertCanAccessCompany = (user: User, companyId: string): void => {
  if (user.isAdmin) return;
  if (user.companyId !== companyId)
    throw new Error('User not authorized to access this company');
};

export const assertUserCanSeeAnalytics = (user: User): void => {
  if (user.isAdmin || user.plan === 'pro') return;
  throw new Error('User not authorized to access analytics');
};

export const assertIsAdmin = (user: User): void => {
  if (user.isAdmin) return;
  throw new Error('Only admins can access this resource');
};
