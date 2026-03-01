
// "use client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Page",
  description: "Plan for Akhirah",
};


export default function About() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      About Page Minha Foundation
    </div>
  );
}
