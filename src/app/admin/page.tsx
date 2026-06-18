import { getSession } from "@/lib/session";
import { AdminClient } from "./AdminClient";

export const revalidate = 0;

export default async function AdminPage() {
  const session = await getSession();
  return <AdminClient initialIsLoggedIn={!!session.isLoggedIn} />;
}
