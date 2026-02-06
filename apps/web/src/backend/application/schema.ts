import z from "zod";
import { MaterialSupplySchema } from "../domain/material/supply/Supply";
import { MaterialDemandSchema } from "../domain/material/demand/Demand";
import { ContactDataSchema, UserSchema } from "../domain/user/User";
import { CompanySchema } from "../domain/company/Company";


export const NewMaterialSupplySchema = MaterialSupplySchema.omit({
    createdDate: true,
    updatedDate: true,
}).extend({
    id: z.uuid().optional(),
    companyId: z.uuid().optional(),
});

export type NewMaterialSupply = z.infer<typeof NewMaterialSupplySchema>;

export const NewMaterialDemandSchema = MaterialDemandSchema.omit({
    createdDate: true,
    updatedDate: true,
}).extend({
    id: z.uuid().optional(),
    companyId: z.uuid().optional(),
});

export type NewMaterialDemand = z.infer<typeof NewMaterialDemandSchema>;

export const MaterialDemandUpdateSchema = MaterialDemandSchema.omit({
    createdDate: true,
    updatedDate: true,
}).extend({
    companyId: z.uuid().optional(),
});

export type MaterialDemandUpdate = z.infer<typeof MaterialDemandUpdateSchema>;

export const MaterialSupplyUpdateSchema = MaterialSupplySchema.omit({
    createdDate: true,
    updatedDate: true,
}).extend({
    companyId: z.uuid().optional(),
});

export type MaterialSupplyUpdate = z.infer<typeof MaterialSupplyUpdateSchema>;

export const ContentTypeSchema = z.enum([
    'application/pdf',
    'image/png',
    'image/jpeg',
    'image/jpg',
]);


export const MaterialFileUploadRequestSchema = z.object({
    uploadType: z.enum(['demand-document', 'supply-document', 'supply-picture']),
    materialId: z.uuid(),
    companyId: z.uuid(),
    contentType: ContentTypeSchema,
});

export const CompanyFileUploadRequestSchema = z.object({
    uploadType: z.enum(['company-logo']),
    companyId: z.uuid(),
    contentType: ContentTypeSchema,
});

export const FileUploadRequestSchema = z.discriminatedUnion('uploadType', [
    MaterialFileUploadRequestSchema,
    CompanyFileUploadRequestSchema,
]);

export const FileUploadResponseSchema = z.object({
    fileId: z.string(),
    downloadUrl: z.string(),
    uploadUrl: z.string(),
});

export type FileUploadRequest = z.infer<typeof FileUploadRequestSchema>;
export type FileUploadResponse = z.infer<typeof FileUploadResponseSchema>;

export const AdminUserUpdateSchema = UserSchema.omit({
    createdDate: true,
    updatedDate: true,
    integrations: true,
    email: true,
});

export const CurrentUserUpdateSchema = AdminUserUpdateSchema.pick({
    id: true,
    firstName: true,
    lastName: true,
    title: true,
    contactData: true,
});

export const UserUpdateSchema = AdminUserUpdateSchema;
export type AdminUserUpdate = z.infer<typeof AdminUserUpdateSchema>;
export type CurrentUserUpdate = z.infer<typeof CurrentUserUpdateSchema>;
export type UserUpdate = z.infer<typeof UserUpdateSchema>;

export const NewUserSchema = UserSchema.omit({
    createdDate: true,
    updatedDate: true,
    integrations: true,
}).extend({
    id: z.uuid().optional(),
});

export type NewUser = z.infer<typeof NewUserSchema>;

export const NewCompanySchema = CompanySchema.omit({
    createdDate: true,
    updatedDate: true,
}).extend({
    id: z.uuid().optional(),
    verified: z.boolean().optional(),
});

export type NewCompany = z.infer<typeof NewCompanySchema>;

export const AdminCompanyUpdateSchema = CompanySchema.omit({
    createdDate: true,
    updatedDate: true,
});

export const UserCompanyUpdateSchema = AdminCompanyUpdateSchema.omit({
    verified: true,
});

export const CompanyUpdateSchema = AdminCompanyUpdateSchema;
export type CompanyUpdate = z.infer<typeof CompanyUpdateSchema>;

