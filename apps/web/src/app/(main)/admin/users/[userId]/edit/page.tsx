import { getAllCompanies, getUserById } from "@/backend";
import { EditUserForm } from "@/features/user/UserForm";
import { notFound } from "next/navigation";

export default async function EditUserPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const [userData, companies] = await Promise.all([
    getUserById(userId),
    getAllCompanies(),
  ]);

  if (!userData) notFound();

  return (
    <div className="container mx-auto max-w-4xl px-4 py-6 md:px-6 md:py-10">
      <h1 className="text-2xl font-bold mb-6">Edit user</h1>
      <EditUserForm
        id={userId}
        defaultValues={userData}
        companies={companies}
      />
    </div>
  );
}
