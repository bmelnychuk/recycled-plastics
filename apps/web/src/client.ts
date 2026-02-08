'use client';

import {
  Company,
  CompanyUpdate,
  CompanyUpdateSchema,
  CurrentCompanyUpdate,
  CurrentCompanyUpdateSchema,
  Document,
  DocumentSchema,
  FileUploadRequest,
  FileUploadRequestSchema,
  FileUploadResponse,
  MaterialDemand,
  MaterialDemandUpdate,
  MaterialDemandUpdateSchema,
  MaterialSupply,
  NewCompany,
  NewCompanySchema,
  NewMaterialDemand,
  NewMaterialDemandSchema,
  NewMaterialSupply,
  NewMaterialSupplySchema,
  newUuid,
  SupplyUpdate,
  SupplyUpdateSchema,
} from '@rp/core';
import Resizer from 'react-image-file-resizer';
import {
  createCompany as createCompanyServer,
  createDemand as createDemandServer,
  createSupply as createSupplyServer,
  updateCompany as updateCompanyServer,
  updateCurrentCompany as updateCurrentCompanyServer,
  updateDemand as updateDemandServer,
  updateSupply as updateSupplyServer,
} from './server';

export interface UploadFileInput {
  file: File;
  upload: FileUploadRequest;
}

const isImageFile = (file: File) => file.type.startsWith('image/');

const resizeFile = (file: File): Promise<File> =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1200,
      1200,
      'JPEG',
      90,
      0,
      (uri) => resolve(uri as File),
      'file',
    );
  });

const getFileUploadUrl = async (
  data: FileUploadRequest,
): Promise<FileUploadResponse> => {
  const res = await fetch(`/api/upload`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
};

const uploadFile = async (input: UploadFileInput): Promise<Document> => {
  const file = isImageFile(input.file)
    ? await resizeFile(input.file)
    : input.file;

  const fileUpload = await getFileUploadUrl(input.upload);

  await fetch(fileUpload.uploadUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Length': file.size.toString(),
      'Content-Type': file.type,
    },
  });

  return DocumentSchema.parse({
    id: fileUpload.fileId,
    url: fileUpload.downloadUrl,
    name: input.file.name,
    createdDate: new Date().toISOString(),
    size: file.size,
    contentType: file.type,
  });
};

const uploadFiles = async (inputs: UploadFileInput[]): Promise<Document[]> => {
  return await Promise.all(inputs.map((f) => uploadFile(f)));
};

export const updateSupply = async (
  supply: SupplyUpdate,
  docFiles: File[],
  pictureFiles: File[],
): Promise<void> => {
  const supplyId = supply.id;

  const uploadedDocs = await uploadFiles(
    docFiles.map((file) => ({
      file,
      upload: FileUploadRequestSchema.parse({
        uploadType: 'supply-document',
        materialId: supplyId,
        companyId: supply.companyId,
        contentType: file.type,
      }),
    })),
  );

  const uploadedPictures = await uploadFiles(
    pictureFiles.map((file) => ({
      file,
      upload: FileUploadRequestSchema.parse({
        uploadType: 'supply-picture',
        materialId: supplyId,
        companyId: supply.companyId,
        contentType: file.type,
      }),
    })),
  );

  const updatedSupply = SupplyUpdateSchema.parse({
    ...supply,
    documents: [...(supply.documents || []), ...uploadedDocs],
    pictures: [...(supply.pictures || []), ...uploadedPictures],
  });

  await updateSupplyServer(updatedSupply);
};

export const createSupply = async (
  supply: NewMaterialSupply,
  docFiles: File[],
  pictureFiles: File[],
): Promise<MaterialSupply> => {
  const materialId = supply.id ?? newUuid();

  const uploadedDocs = await uploadFiles(
    docFiles.map((file) => ({
      file,
      upload: FileUploadRequestSchema.parse({
        uploadType: 'supply-document',
        materialId,
        companyId: supply.companyId,
        contentType: file.type,
      }),
    })),
  );

  const uploadedPictures = await uploadFiles(
    pictureFiles.map((file) => ({
      file,
      upload: FileUploadRequestSchema.parse({
        uploadType: 'supply-picture',
        materialId,
        companyId: supply.companyId,
        contentType: file.type,
      }),
    })),
  );

  const newSupply = NewMaterialSupplySchema.parse({
    ...supply,
    id: materialId,
    documents: [...(supply.documents || []), ...uploadedDocs],
    pictures: [...(supply.pictures || []), ...uploadedPictures],
  });

  return createSupplyServer(newSupply);
};

export const updateDemand = async (
  demand: MaterialDemandUpdate,
  docFiles: File[],
): Promise<void> => {
  const demandId = demand.id;

  const uploadedDocs = await uploadFiles(
    docFiles.map((file) => ({
      file,
      upload: FileUploadRequestSchema.parse({
        uploadType: 'demand-document',
        materialId: demandId,
        companyId: demand.companyId,
        contentType: file.type,
      }),
    })),
  );

  const updatedDemand = MaterialDemandUpdateSchema.parse({
    ...demand,
    documents: [...(demand.documents || []), ...uploadedDocs],
  });

  await updateDemandServer(updatedDemand);
};

export const createDemand = async (
  demand: NewMaterialDemand,
  docFiles: File[],
): Promise<MaterialDemand> => {
  const materialId = demand.id ?? newUuid();

  const uploadedDocs = await uploadFiles(
    docFiles.map((file) => ({
      file,
      upload: FileUploadRequestSchema.parse({
        uploadType: 'demand-document',
        materialId,
        companyId: demand.companyId,
        contentType: file.type,
      }),
    })),
  );

  const newDemand = NewMaterialDemandSchema.parse({
    ...demand,
    id: materialId,
    documents: [...(demand.documents || []), ...uploadedDocs],
  });

  return createDemandServer(newDemand);
};

const uploadLogoFile = async (
  file: File,
  companyId: string,
): Promise<string> => {
  const resizedFile = await resizeFile(file);

  const fileUpload = await getFileUploadUrl(
    FileUploadRequestSchema.parse({
      uploadType: 'company-logo',
      companyId,
      contentType: file.type,
    }),
  );

  await fetch(fileUpload.uploadUrl, {
    method: 'PUT',
    body: resizedFile,
    headers: {
      'Content-Length': resizedFile.size.toString(),
      'Content-Type': resizedFile.type,
    },
  });

  return fileUpload.downloadUrl;
};

export const createCompany = async (
  company: NewCompany,
  logoFile?: File,
): Promise<Company> => {
  const companyId = company.id ?? newUuid();

  const logoUrl = logoFile
    ? await uploadLogoFile(logoFile, companyId)
    : company.branding?.logo;

  const newCompany = NewCompanySchema.parse({
    ...company,
    id: companyId,
    branding: { ...company.branding, logo: logoUrl },
  });

  return createCompanyServer(newCompany);
};

export const updateCompany = async (
  company: CompanyUpdate,
  logoFile?: File,
): Promise<Company> => {
  const logoUrl = logoFile
    ? await uploadLogoFile(logoFile, company.id)
    : company.branding?.logo;

  const updatedCompany = CompanyUpdateSchema.parse({
    ...company,
    branding: { ...company.branding, logo: logoUrl },
  });

  return updateCompanyServer(updatedCompany);
};

export const updateCurrentCompany = async (
  company: CurrentCompanyUpdate,
  companyId: string,
  logoFile?: File,
): Promise<Company> => {
  const logoUrl = logoFile
    ? await uploadLogoFile(logoFile, companyId)
    : company.branding?.logo;

  const updatedCompany = CurrentCompanyUpdateSchema.parse({
    ...company,
    branding: { ...company.branding, logo: logoUrl },
  });

  return updateCurrentCompanyServer(updatedCompany);
};
