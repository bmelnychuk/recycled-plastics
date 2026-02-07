import { z } from 'zod';
import {
  UserSchema,
  User as DomainUser
} from '../../../domain/user/User';
import { UserRepository } from '../../../domain/user/UserRepository';
import { newUuid } from '../../../lib/identity';
import { assertIsAdmin, User } from '../../auth/User';

export const NewUserSchema = UserSchema.omit({
  createdDate: true,
  updatedDate: true,
  integrations: true,
}).extend({
  id: z.uuid().optional(),
});

export type NewUser = z.infer<typeof NewUserSchema>;

export class CreateUser {
  constructor(private readonly userRepository: UserRepository) { }

  public async invoke(
    sessionUser: User,
    newUser: NewUser,
  ): Promise<DomainUser> {
    assertIsAdmin(sessionUser);

    const now = new Date().toISOString();
    const user = UserSchema.parse({
      ...newUser,
      id: newUser.id ?? newUuid(),
      createdDate: now,
      updatedDate: now,
      integrations: {},
    });

    await this.userRepository.create(user);

    return user;
  }
}
