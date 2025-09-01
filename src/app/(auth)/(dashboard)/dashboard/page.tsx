import { supabase } from "@/lib/supabaseClient";
import LogoutButton from "@/components/LogoutButton";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <LogoutButton />
      </div>
      <p>Welcome, {session.user.email} 🎉</p>
      <p className="mt-4">Lessons will show here (next step).</p>
    </div>
  );
}
