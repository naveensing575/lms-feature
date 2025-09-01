"use client";

import { supabaseBrowser } from "@/lib/supabaseBrowser";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function LogoutButton() {
  const router = useRouter();
  const supabase = supabaseBrowser();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <Button
      variant="destructive"
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
}
