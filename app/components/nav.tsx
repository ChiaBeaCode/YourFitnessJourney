"use client"
import Link from "next/link";
import { useSession } from "next-auth/react";
//TODO: use session from AuthProvider instead

export default function Nav() {
  const {data: session, status} = useSession()
  return (
    <nav className="flex justify-end text-xl text-center pr-10 space-x-10 bg-blue min-w-full p-5 opacity-90">
      <Link href={"/exercises"} >Exercises</Link>
      <Link href={"/counter"} >Counter</Link>
      {status === "authenticated" ? 
      <Link href={"/api/auth/signout"} >Sign Out</Link> :
      <Link href={"/login"} >Sign In</Link>
      }
      <Link href={"/signup"}>Sign Up</Link>
    </nav>
  );
}
