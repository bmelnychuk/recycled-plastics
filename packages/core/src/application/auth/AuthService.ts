export type UserProfile = {
  firstName: string;
  lastName: string;
};

export interface AuthService {
  updateUser(authUserId: string, profile: UserProfile): Promise<void>;
}
