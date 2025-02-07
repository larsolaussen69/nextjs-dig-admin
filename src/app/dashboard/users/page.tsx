import { getAllUsers } from "@/lib/sql/users";
import UserList from "@/components/dashboard/user/userlist";

export default async function UsersPage() {
  const users = await getAllUsers();

  return (
    <>
        <UserList users={users} />
    </>
  );
}