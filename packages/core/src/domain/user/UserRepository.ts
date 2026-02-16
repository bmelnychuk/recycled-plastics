import { User } from './User';

export interface UserRepository {
  findByAuthIds(ids: string[]): Promise<Map<string, User>>;
  getByIds(ids: string[]): Promise<Map<string, User>>;
}
