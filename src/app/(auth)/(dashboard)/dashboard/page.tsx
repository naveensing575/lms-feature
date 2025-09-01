import { supabaseServer } from "@/lib/supabaseServer";
import LogoutButton from "@/components/LogoutButton";
import { redirect } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default async function DashboardPage() {
  const supabase = supabaseServer();

  // Get authenticated user
  const {
    data: { user },
    error,
  } = await (await supabase).auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-[600px]">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">Dashboard</CardTitle>
          <LogoutButton />
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Welcome, <span className="font-semibold">{user.email}</span> 🎉
          </p>
          <p>Your upcoming lessons will appear here (next step).</p>
        </CardContent>
      </Card>
    </div>
  );
}
