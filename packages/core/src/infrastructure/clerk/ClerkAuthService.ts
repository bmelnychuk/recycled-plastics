import { ClerkClient, createClerkClient } from '@clerk/backend';
import {
  AuthService,
  AuthUserUpdatePayload,
} from '../../application/auth/AuthService';
import { UserRepository } from '../../domain/user/UserRepository';
import { User } from '../../domain/user/User';

export class ClerkAuthService implements AuthService, UserRepository {
  private readonly clerk: ClerkClient;

  constructor(private readonly clerkSecretKey: string) {
    this.clerk = createClerkClient({ secretKey: this.clerkSecretKey });
  }

  public async findByAuthIds(ids: string[]): Promise<Map<string, User>> {
    const uniqueIds = [...new Set(ids)];

    const users = await this.clerk.users.getUserList({
      userId: uniqueIds.map((id) => `+${id}`),
    });

    return new Map(
      users.data.map((user) => {
        return [
          user.id,
          {
            id: user.id,
            email: user.primaryEmailAddress?.emailAddress ?? '',
            firstName: user.firstName ?? '',
            lastName: user.lastName ?? '',
          },
        ];
      }),
    );
  }

  public async getByIds(ids: string[]): Promise<Map<string, User>> {
    const uniqueIds = [...new Set(ids)];

    const users = await this.clerk.users.getUserList({
      externalId: uniqueIds.map((id) => `+${id}`),
    });

    const validUsers: User[] = users.data
      .map((user) => {
        if (!user.externalId) return undefined;
        return {
          id: user.externalId,
          email: user.primaryEmailAddress?.emailAddress ?? '',
          firstName: user.firstName ?? '',
          lastName: user.lastName ?? '',
        };
      })
      .filter((user) => user !== undefined);

    return new Map(validUsers.map((user) => [user.id, user]));
  }

  public async updateUser(
    authUserId: string,
    data: AuthUserUpdatePayload,
  ): Promise<void> {
    if (data.externalId) {
      await this.clerk.users.updateUser(authUserId, {
        externalId: data.externalId,
      });
    }
    if (data.companyId || data.isCompanyVerified !== undefined) {
      await this.clerk.users.updateUserMetadata(authUserId, {
        publicMetadata: {
          ...(data.companyId !== undefined && { companyId: data.companyId }),
          ...(data.isCompanyVerified !== undefined && {
            isCompanyVerified: String(data.isCompanyVerified),
          }),
        },
      });
    }
  }
}
