import { ClerkClient, createClerkClient } from '@clerk/backend';
import {
  AuthService,
  SignedInUser,
  SignedInUserSchema,
} from '../../application/auth/AuthService';

export class ClerkAuthService implements AuthService {
  private readonly clerk: ClerkClient;

  constructor(private readonly clerkSecretKey: string) {
    this.clerk = createClerkClient({ secretKey: this.clerkSecretKey });
  }

  public async attachExternalId(ids: {
    authId: string;
    userId: string;
  }): Promise<void> {
    await this.clerk.users.updateUser(ids.authId, { externalId: ids.userId });
  }

  public async getByExternalIds(
    externalIds: string[],
  ): Promise<SignedInUser[]> {
    const users = await this.clerk.users.getUserList({
      externalId: externalIds.map((id) => `+${id}`),
    });
    return users.data.map((user) =>
      SignedInUserSchema.parse({
        id: user.externalId,
        authId: user.externalId,
        companyId: user.publicMetadata.companyId,
        isCompanyVerified: user.publicMetadata.isCompanyVerified === 'true',
        isAdmin: user.publicMetadata.role === 'admin',
      }),
    );
  }
}
