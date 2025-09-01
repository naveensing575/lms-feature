"use client";

import { supabaseBrowser } from "@/lib/supabaseBrowser";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function LogoutButton() {
  const supabase = supabaseBrowser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);

    router.replace("/login");

    await supabase.auth.signOut();

    router.refresh();
  };

  return (
    <Button
      variant="destructive"
      onClick={handleLogout}
      disabled={loading}
      className="flex items-center gap-2"
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {loading ? "Logging out..." : "Logout"}
    </Button>
  );
}
