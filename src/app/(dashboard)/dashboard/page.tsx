import { supabaseServer } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import LessonsList from "@/components/LessonsList";

export default async function DashboardPage() {
  const supabase = await supabaseServer();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  // 🔎 Debug logs
  console.log("[Dashboard] user:", user);
  console.log("[Dashboard] userError:", userError);

  if (userError || !user) {
    console.log("[Dashboard] Redirecting to /login because user is null or error exists");
    redirect("/login");
  }

  const { data: lessons, error: lessonsError } = await supabase
    .from("lessons")
    .select("*")
    .eq("student_id", user.id)
    .order("date", { ascending: true });

  // 🔎 Debug logs
  console.log("[Dashboard] lessons:", lessons);
  console.log("[Dashboard] lessonsError:", lessonsError);

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-[700px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Dashboard</CardTitle>
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
