import { MaterialSupply } from './Supply';

export interface MaterialSupplyRepository {
  getById(companyId: string, id: string): Promise<MaterialSupply>;
  getByCompanyId(companyId: string): Promise<MaterialSupply[]>;
  getActiveSupply(startDate?: Date): Promise<MaterialSupply[]>;
  getUnverifiedSupply(): Promise<MaterialSupply[]>;
  create(materialSupply: MaterialSupply): Promise<void>;
  update(materialSupply: MaterialSupply): Promise<void>;
  delete(companyId: string, id: string): Promise<void>;
}
