import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Contour LMS",
  description: "Simplified LMS Feature Demo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <div className="min-h-screen flex flex-col">
          <header className="w-full border-b bg-primary text-primary-foreground px-6 py-4">
            <h1 className="text-xl font-semibold">Contour LMS</h1>
          </header>
          <main className="flex-1 p-6">{children}</main>
          <footer className="w-full border-t bg-card px-6 py-4 text-sm text-muted-foreground">
            © {new Date().getFullYear()} Contour Education
          </footer>
        </div>
      </body>
    </html>
  );
}
