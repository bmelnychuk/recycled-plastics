import { getAllCompanies } from "@/backend";
import { NewUserForm } from "@/features/user/UserForm";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ companyId?: string }>;
}) {
  const { companyId } = await searchParams;
  const companies = await getAllCompanies();

  return (
    <div className="container mx-auto max-w-4xl px-4 py-6 md:px-6 md:py-10">
      <h1 className="text-2xl font-bold mb-6">New user</h1>
      <NewUserForm companies={companies} companyId={companyId} />
    </div>
  );
}
