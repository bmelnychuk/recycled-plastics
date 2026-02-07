import { MaterialDemand } from './Demand';

export interface MaterialDemandRepository {
  getById(companyId: string, id: string): Promise<MaterialDemand>;
  getByCompanyId(companyId: string): Promise<MaterialDemand[]>;
  getActiveDemand(startDate?: Date): Promise<MaterialDemand[]>;
  getUnverifiedDemand(): Promise<MaterialDemand[]>;
  create(materialDemand: MaterialDemand): Promise<void>;
  update(materialDemand: MaterialDemand): Promise<void>;
  delete(companyId: string, id: string): Promise<void>;
}
