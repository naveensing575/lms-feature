"use client";

import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <Button
      onClick={handleLogout}
      className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
    >
      Logout
    </Button>
  );
}
