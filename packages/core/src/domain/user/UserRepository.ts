import { User } from './User';

export interface UserRepository {
  findByIds(ids: string[]): Promise<Map<string, User>>;
}
