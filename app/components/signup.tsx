"use client";
import { useState } from "react";
import Link from "next/link";
import ErrorMessage from "./error";
import { useRouter } from "next/navigation";
//TODO: useSession to prevent access to this page if already have account/authenticated unless signed out

// type ChildProps = {
//   handleToggle: () => void;
// };

// export default function Signup(props: ChildProps) {
export default function Signup() {
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!username || !password || !email) {
      setErrorMessage("Please fill out all sections");
      return;
    }
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          email,
        }),
      });
      const data = await res.json();
      console.log("SIGNUP PAGE", data);
      if (data.status !== 200) {
        setErrorMessage(data.message);
      } else {
        // TODO: changed V
        router.push("/");
      }
    } catch (error) {
      setErrorMessage(errorMessage);
    }
  }
  return (
      <section className="flex flex-col m-auto py-5 px-4 w-80 rounded-md border-2 border-themeBlue-600 bg-white">
        <h1 className=" text-center text-2xl mb-8 after:w-4/5 after:m-auto after:h-2 after:rounded after:bg-themeBlue-300 after:block">
          Create Account
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
        <label className="pl-2">Username:</label>

          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            className=" py-2 px-3 mt-1 mb-3 rounded-xl border-2 border-themeBlue-600"
          />
          <label className="pl-2">Password:</label>

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className=" py-2 px-3 mt-1 mb-3 rounded-xl border-2 border-themeBlue-600"
          />
          <label className="pl-2">Email:</label>

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className=" py-2 px-3 mt-1 mb-3 rounded-xl border-2 border-themeBlue-600"
          />

          <button
            type="submit"
            className=" text-lg text-white tracking-wide self-center w-fit p-1 px-3 mt-5 rounded-xl border-2 border-themeBlue-600 bg-themeBlue-600 hover:bg-themeBlue-300 hover:text-black"
          >
            Sign Up
          </button>
        </form>
        <p className="flex justify-center text-lg mt-4">
          Already have an account?
          {/* <button onClick={props.handleToggle}>here</button> */}
        </p>
        <Link
          href={"/signup"}
          className="flex justify-center hover:text-themeBlue-600 underline"
        >
          Sign In
        </Link>
      </section>
  );
}
