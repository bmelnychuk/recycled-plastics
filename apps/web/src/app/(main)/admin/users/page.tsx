import { getAllUsers } from "@/backend/api";
import { UsersTable } from "@/features/user/UsersTable";

export default async function Page() {
  const users = await getAllUsers();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Users</h1>
      <UsersTable users={users} />
    </div>
  );
}
