import { User } from './User';

export interface UserRepository {
  getById(id: string): Promise<User>;
  getByCompanyId(companyId: string): Promise<User[]>;
  create(user: User): Promise<void>;
  update(user: User): Promise<void>;
  getAll(): Promise<User[]>;
}
