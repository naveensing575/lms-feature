"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabaseBrowser";
import LogoutButton from "@/components/LogoutButton";

export default function Navbar() {
  const supabase = supabaseBrowser();
  const [user, setUser] = useState<unknown>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [supabase]);

  if (!user) return null;

  return (
    <header className="w-full border-b bg-primary text-primary-foreground px-6 py-4">
      <nav className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Contour LMS</h1>
        <LogoutButton />
      </nav>
    </header>
  );
}
