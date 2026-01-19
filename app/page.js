"use client"
import Navbar from "@/components/Navbar";
import Ecosystem from "@/components/Ecosystem";
import Link from "next/link";
import CreatorSection from "@/components/CreatorSection";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  const {data:session}= useSession()
  if(session){
    redirect("/home");
  }
  return (
    <main className="min-h-screen">
      

      <section className="max-w-7xl mx-auto px-6 py-16">
        {/* HERO */}
        <h1 className="text-7xl font-bold tracking-tight text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
          Patronic
        </h1>

        <p className="text-gray-400 mt-4 max-w-xl text-[20px]">
          Patrons — supporters who back creators and their work.
        </p>

        <div className="flex gap-4 mt-8">
          <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600">
            <Link href={"/login"}>
            Explore Creators
          </Link>
          </button>
          <button className="px-6 py-3 rounded-xl border border-gray-700">
            <Link href={"/login"}>
            Become Creator
          </Link>
          </button>
        </div>
      </section>

      <Ecosystem />
      <CreatorSection />
    </main>
  );
}
// export const metadata = {
//   title: "Patronic - Empowering Developers, Raising Funds",
//   description:
//     "Join Patronic today to raise funds for your projects. Empower your development journey and turn your ideas into reality with ease and trust.",
// }