import { supabaseServer } from "@/lib/supabaseServer";
import LogoutButton from "@/components/LogoutButton";
import { redirect } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import LessonsList from "@/components/LessonsList";

export default async function DashboardPage() {
  const supabase = await supabaseServer();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

  const { data: lessons } = await supabase
    .from("lessons")
    .select("*")
    .eq("student_id", user.id)
    .order("date", { ascending: true });

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-[700px]">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">Dashboard</CardTitle>
          <LogoutButton />
        </CardHeader>
        <CardContent>
          <p className="mb-6">
            Welcome, <span className="font-semibold">{user.email}</span> 🎉
          </p>

          {!lessons || lessons.length === 0 ? (
            <p className="text-muted-foreground">No upcoming lessons.</p>
          ) : (
            <LessonsList lessons={lessons} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
