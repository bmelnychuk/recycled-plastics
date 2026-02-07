import { UserRepository } from '../../../domain/user/UserRepository';
import { assertCanUpdateUser, User as SessionUser } from '../../auth/User';
import z from 'zod';
import { UserSchema } from '../../../domain/user/User';
import { AuthService } from '../../auth/AuthService';

export const CurrentUserUpdateSchema = UserSchema.pick({
  id: true,
  firstName: true,
  lastName: true,
  title: true,
  contactData: true,
});

export type CurrentUserUpdateSchema = z.infer<typeof CurrentUserUpdateSchema>;

export class UpdateCurrentUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) { }

  async invoke(user: SessionUser, userUpdate: CurrentUserUpdateSchema): Promise<void> {
    assertCanUpdateUser(user, userUpdate.id);

    const existingUser = await this.userRepository.getById(userUpdate.id);

    const updatedUser = UserSchema.parse({
      ...existingUser,
      ...userUpdate,
      updatedDate: new Date().toISOString(),
    });

    await this.userRepository.update(updatedUser);

    const authUserId = existingUser.integrations?.['clerk'];
    if (authUserId) {
      await this.authService.updateUser(user.authUserId, userUpdate);
    }
  }
}
