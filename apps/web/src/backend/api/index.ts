"use server";

import { revalidatePath } from "next/cache";
import { v4 } from "uuid";

import { serverApiFetch } from "./server";
import { MaterialSupply, MaterialSupplySchema } from "../domain/material/supply/Supply";
import { MaterialDemand } from "../domain/material/demand/Demand";
import { CompanyViewModel, DemandViewModel, SupplyViewModel, UserViewModel } from "../application/view-model/ViewModels";
import { News } from "../domain/news/News";
import { AdminUserUpdate, CompanyUpdate, CompanyUpdateSchema, CurrentUserUpdate, FileUploadRequest, FileUploadRequestSchema, FileUploadResponse, MaterialDemandUpdate, MaterialDemandUpdateSchema, MaterialSupplyUpdate, MaterialSupplyUpdateSchema, NewCompany, NewCompanySchema, NewMaterialDemand, NewMaterialDemandSchema, NewMaterialSupply, NewMaterialSupplySchema, NewUser } from "../application/schema";
import { DocumentSchema, Document } from "../domain/material/Material";
import { Company } from "../domain/company/Company";
import { PlanType } from "../domain/user/User";

// import {
//   FileUploadRequest,
//   FileUploadRequestSchema,
//   FileUploadResponse,
// } from "../../api/schema/Upload";

export interface SignedInUser extends UserViewModel {
  isAdmin: boolean;
}

export const getSupplyMaterial = async (
  companyId: string,
  materialId: string
): Promise<MaterialSupply> => {
  return serverApiFetch<MaterialSupply>(
    `/companies/${companyId}/supply/${materialId}`
  );
};

export const getDemandMaterial = async (
  companyId: string,
  materialId: string
): Promise<MaterialDemand> => {
  return serverApiFetch<MaterialDemand>(
    `/companies/${companyId}/demand/${materialId}`
  );
};

export const getSupplyMaterials = async (
  startDate?: Date
): Promise<SupplyViewModel[]> => {
  const queryParams = new URLSearchParams();
  if (startDate) queryParams.set("startDate", startDate.toISOString());
  return serverApiFetch<SupplyViewModel[]>(`/supply?${queryParams.toString()}`);
};

export const getDemandMaterials = async (
  startDate?: Date
): Promise<DemandViewModel[]> => {
  const queryParams = new URLSearchParams();
  if (startDate) queryParams.set("startDate", startDate.toISOString());
  return serverApiFetch<DemandViewModel[]>(`/demand?${queryParams.toString()}`);
};

export const getCompanyDetails = async (
  companyId: string
): Promise<CompanyViewModel | undefined> => {
  try {
    return await serverApiFetch<CompanyViewModel>(`/companies/${companyId}`);
  } catch {
    return undefined;
  }
};

// export const getMaterialsAnalyticsByCountry = async (): Promise<
//   MaterialAnalyticsByCountry[]
// > => {
//   return serverApiFetch<MaterialAnalyticsByCountry[]>(
//     `/analytics/materials?category=by-country`
//   );
// };

// export const getMaterialsAnalyticsByDate = async (): Promise<
//   MaterialAnalyticsByDate[]
// > => {
//   return serverApiFetch<MaterialAnalyticsByDate[]>(
//     `/analytics/materials?category=by-date`
//   );
// };

// export const getPlatformAnalytics = async (): Promise<PlatformAnalytics> => {
//   return serverApiFetch<PlatformAnalytics>(`/analytics/platform`);
// };

export const getNews = async (): Promise<News[]> => {
  return serverApiFetch<News[]>(`/news`);
};


// internal methods
const uploadFile = async (input: UploadFileInput): Promise<Document> => {
  const fileUpload = await getFileUploadUrl(input.upload);

  await fetch(fileUpload.uploadUrl, {
    method: "PUT",
    body: input.file,
    headers: {
      "Content-Length": input.file.size.toString(),
      "Content-Type": input.file.type,
    },
  });

  return DocumentSchema.parse({
    id: fileUpload.fileId,
    url: fileUpload.downloadUrl,
    name: input.file.name,
    createdDate: new Date().toISOString(),
    size: input.file.size,
    contentType: input.file.type,
  });
};

const uploadFiles = async (inputs: UploadFileInput[]): Promise<Document[]> => {
  return await Promise.all(inputs.map((f) => uploadFile(f)));
};

export interface UploadFileInput {
  file: File;
  upload: FileUploadRequest;
}

export const getFileUploadUrl = async (
  data: FileUploadRequest
): Promise<FileUploadResponse> => {
  return serverApiFetch<FileUploadResponse>(`/upload`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const createMaterialSupply = async (
  newSupply: NewMaterialSupply,
  docFiles: File[],
  pictureFiles: File[]
): Promise<void> => {
  const supplyId = newSupply.id ?? newUuid();

  const uploadedDocs = await uploadFiles(
    docFiles.map((file) => ({
      file,
      upload: FileUploadRequestSchema.parse({
        uploadType: "supply-document",
        materialId: supplyId,
        companyId: newSupply.companyId,
        contentType: file.type,
      }),
    }))
  );

  const uploadedPictures = await uploadFiles(
    pictureFiles.map((file) => ({
      file,
      upload: FileUploadRequestSchema.parse({
        uploadType: "supply-picture",
        materialId: supplyId,
        companyId: newSupply.companyId,
        contentType: file.type,
      }),
    }))
  );

  const supply = NewMaterialSupplySchema.parse({
    ...newSupply,
    id: supplyId,
    documents: uploadedDocs,
    pictures: uploadedPictures,
  });

  await serverApiFetch<void>(`/supply`, {
    method: "PUT",
    body: JSON.stringify(supply),
  });

  revalidatePath("/supply");
};

export const createMaterialDemand = async (
  newDemand: NewMaterialDemand,
  docFiles: File[]
): Promise<void> => {
  const demandId = newDemand.id ?? newUuid();

  const uploadedDocs = await uploadFiles(
    docFiles.map((file) => ({
      file,
      upload: FileUploadRequestSchema.parse({
        uploadType: "supply-document",
        materialId: demandId,
        companyId: newDemand.companyId,
        contentType: file.type,
      }),
    }))
  );

  const enrichedDemand = NewMaterialDemandSchema.parse({
    ...newDemand,
    id: demandId,
    documents: uploadedDocs,
  });

  await serverApiFetch<void>(`/demand`, {
    method: "PUT",
    body: JSON.stringify(enrichedDemand),
  });

  revalidatePath("/demand");
};

export const getCompanyDemand = async (
  companyId: string
): Promise<DemandViewModel[]> => {
  return serverApiFetch<DemandViewModel[]>(`/companies/${companyId}/demand`);
};

export const getCompanySupply = async (
  companyId: string
): Promise<SupplyViewModel[]> => {
  return serverApiFetch<SupplyViewModel[]>(`/companies/${companyId}/supply`);
};

export const updateMaterialDemand = async (
  demand: MaterialDemandUpdate,
  docFiles: File[]
): Promise<void> => {
  const demandId = demand.id;

  const uploadedDocs = await uploadFiles(
    docFiles.map((file) => ({
      file,
      upload: FileUploadRequestSchema.parse({
        uploadType: "demand-document",
        materialId: demandId,
        companyId: demand.companyId,
        contentType: file.type,
      }),
    }))
  );

  const updatedDemand = MaterialDemandUpdateSchema.parse({
    ...demand,
    documents: [...(demand.documents || []), ...uploadedDocs],
  });

  await serverApiFetch<void>(`/demand`, {
    method: "POST",
    body: JSON.stringify(updatedDemand),
  });

  revalidatePath("/demand");
};

export const updateMaterialSupply = async (
  supply: MaterialSupplyUpdate,
  docFiles: File[],
  pictureFiles: File[]
): Promise<void> => {
  const supplyId = supply.id;

  const uploadedDocs = await uploadFiles(
    docFiles.map((file) => ({
      file,
      upload: FileUploadRequestSchema.parse({
        uploadType: "supply-document",
        materialId: supplyId,
        companyId: supply.companyId,
        contentType: file.type,
      }),
    }))
  );

  const uploadedPictures = await uploadFiles(
    pictureFiles.map((file) => ({
      file,
      upload: FileUploadRequestSchema.parse({
        uploadType: "supply-picture",
        parentId: supplyId,
        contentType: file.type,
      }),
      uploadType: "supply-picture",
    }))
  );

  const updatedSupply = MaterialSupplyUpdateSchema.parse({
    ...supply,
    documents: [...(supply.documents || []), ...uploadedDocs],
    pictures: [...(supply.pictures || []), ...uploadedPictures],
  });

  await serverApiFetch<void>(`/supply`, {
    method: "POST",
    body: JSON.stringify(updatedSupply),
  });

  revalidatePath("/supply");
};

export const getUser = async (): Promise<UserViewModel | undefined> => {
  try {
    return await serverApiFetch<UserViewModel>(`/me`);
  } catch {
    return undefined;
  }
};

export const updateCurrentUser = async (
  userUpdate: CurrentUserUpdate
): Promise<void> => {
  await serverApiFetch<void>(`/me`, {
    method: "POST",
    body: JSON.stringify(userUpdate),
  });
};

export const updateUser = async (userUpdate: AdminUserUpdate | CurrentUserUpdate): Promise<void> => {
  await serverApiFetch<void>(`/users`, {
    method: "POST",
    body: JSON.stringify(userUpdate),
  });
};

export const createUser = async (user: NewUser): Promise<void> => {
  await serverApiFetch<void>(`/users`, {
    method: "PUT",
    body: JSON.stringify(user),
  });
};

export const createCompany = async (
  company: NewCompany,
  logo?: File
): Promise<void> => {
  const uploadedDocs = logo
    ? await uploadFiles([
      {
        file: logo,
        upload: FileUploadRequestSchema.parse({
          uploadType: "company-logo",
          companyId: company.id,
          contentType: logo.type,
        }),
      }])
    : [];

  const newCompany = NewCompanySchema.parse({
    ...company,
    branding: {
      ...company.branding,
      logo: uploadedDocs[0]?.url,
    },
  });

  await serverApiFetch<void>(`/companies`, {
    method: "PUT",
    body: JSON.stringify(newCompany),
  });
};

export const updateCompany = async (
  company: CompanyUpdate,
  logo?: File
): Promise<void> => {
  const uploadedDocs = logo
    ? await uploadFiles([
      {
        file: logo,
        upload: FileUploadRequestSchema.parse({
          uploadType: "company-logo",
          companyId: company.id,
          contentType: logo.type,
        }),
      }])
    : [];

  const updatedCompany = CompanyUpdateSchema.parse({
    ...company,
    branding: {
      ...company.branding,
      logo: uploadedDocs[0]?.url,
    },
  });

  await serverApiFetch<void>(`/companies`, {
    method: "POST",
    body: JSON.stringify(updatedCompany),
  });
};

export const getUnverifiedDemand = async (): Promise<DemandViewModel[]> => {
  const result = await serverApiFetch<DemandViewModel[]>(`/unverified-demand`);
  return result || [];
};

export const getUnverifiedSupply = async (): Promise<SupplyViewModel[]> => {
  const result = await serverApiFetch<SupplyViewModel[]>(`/unverified-supply`);
  return result || [];
};

export const getUnverifiedCompanies = async (): Promise<Company[]> => {
  const result = await serverApiFetch<Company[]>(`/unverified-companies`);
  return result || [];
};

export const getVerifiedCompanies = async (): Promise<Company[]> => {
  const result = await serverApiFetch<Company[]>(`/verified-companies`);
  return result || [];
};

export interface VerifiedCompany {
  id: string;
  name: string;
  updatedDate: string;
  verified: boolean;
}

export const getAllCompanies = async (): Promise<Company[]> => {
  const result = await serverApiFetch<Company[]>(`/companies`);
  return result || [];
};

export const getCompanyUsers = async (
  companyId: string
): Promise<UserViewModel[]> => {
  const result = await serverApiFetch<UserViewModel[]>(
    `/companies/${companyId}/users`
  );
  return result || [];
};

export interface ReducedUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  updatedDate: string;
  plan: PlanType;
  company?: {
    id: string;
    name: string;
    verified: boolean;
    updatedDate: string;
  }
}

export const getAllUsers = async (): Promise<ReducedUser[]> => {
  const result = await serverApiFetch<ReducedUser[]>(`/users`);
  return result || [];
};

export const getUserById = async (
  userId: string
): Promise<UserViewModel | undefined> => {
  return serverApiFetch<UserViewModel>(`/users/${userId}`);
};

const newUuid = () => v4();
