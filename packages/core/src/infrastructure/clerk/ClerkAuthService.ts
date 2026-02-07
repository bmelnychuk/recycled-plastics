import { ClerkClient, createClerkClient } from '@clerk/backend';
import { AuthService, UserProfile } from '../../application/auth/AuthService';

export class ClerkAuthService implements AuthService {
  private readonly clerk: ClerkClient;

  constructor(private readonly clerkSecretKey: string) {
    this.clerk = createClerkClient({ secretKey: this.clerkSecretKey });
  }

  async updateUser(authUserId: string, profile: UserProfile): Promise<void> {
    await this.clerk.users.updateUser(authUserId, {
      firstName: profile.firstName,
      lastName: profile.lastName,
    });
  }
}
