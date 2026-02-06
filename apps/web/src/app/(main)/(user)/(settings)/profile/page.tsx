import { EditCurrentUserForm } from "@/features/user/UserForm";

import { getSignedInUser } from "@/backend/api/session";

export default async function Page() {
  const user = await getSignedInUser();

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      <div className="w-full max-w-4xl">
        <EditCurrentUserForm currentUser={user} />
      </div>
    </div>
  );
}
