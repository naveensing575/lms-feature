import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center h-[80vh] text-center">
      <h1 className="text-4xl font-bold mb-4 text-primary">
        Welcome to Contour LMS
      </h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-md">
        A simplified learning management feature built with Next.js, Supabase,
        and shadcn/ui.
      </p>
      <Link href="/login">
        <Button size="lg">Get Started</Button>
      </Link>
    </section>
  );
}
