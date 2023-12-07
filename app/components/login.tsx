"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { AiFillGithub } from "react-icons/ai";

import ErrorMessage from "./error";

// type ChildProps = {
//   handleToggle: () => void;
// };
export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!username || !password) {
      setErrorMessage("Username and/or password is missing");
      return;
    }
    try {
      const res = await signIn("credentials", {
        username: username,
        password: password,
        redirect: false,
      });
      console.log("Login try block", res);
      if (!res || res.status !== 200) {
        setErrorMessage("Invalid username and/or password");
      } else {
        router.push("/exercises");
      }
    } catch (error) {
      setErrorMessage("Error Occured");
    }
  }
  return (
    <>
      <section className="flex flex-col m-auto py-5 px-4 w-80 rounded-md border-2 border-themeBlue-600 bg-white">
        <h1 className=" text-center text-2xl mb-8 after:w-4/5 after:m-auto after:h-2 after:rounded after:bg-themeBlue-300 after:block">
          Sign in
        </h1>
        <button
          onClick={() => signIn("github")}
          className="flex flex-row text-lg m-auto p-2 pr-3 w-fit rounded-xl border-2 border-neutral-600 shadow-md shadow-neutral-700 hover:scale-105 hover:transform-gpu hover:duration-200"
        >
          <AiFillGithub className=" mx-2 text-3xl" /> GitHub
        </button>

        <p className=" flex justify-center text-lg m-2">or</p>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex flex-col">
            <label className="pl-2">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              className="py-2 px-3 mt-1 mb-3 rounded-xl border-2 border-themeBlue-600"
            />
            <label className="pl-2">Password</label>

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="py-2 px-3 mt-1 mb-3 rounded-xl border-2 border-themeBlue-600"
            />
          </div>
          {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
          <Link
            href={"/exercises"}
            className=" pl-2 hover:text-themeBlue-600 underline"
          >
            Forgot password?
          </Link>
          <br />
          <button
            type="submit"
            className=" text-lg text-white tracking-wide self-center w-fit p-2 px-3 mt-5 rounded-xl border-2 bg-themeBlue-600 hover:bg-themeBlue-300 hover:text-black"

            // className=" text-lg self-center w-fit py-1 px-2 mt-5 rounded-xl border-2 border-themeBlue-600 hover:bg-themeBlue-300 "
          >
            Login
          </button>
        </form>
        <p className="flex justify-center text-lg mt-4">
          Dont have an account?
          {/* <button onClick={props.handleToggle}>here</button> */}
        </p>
        <Link
          href={"/signup"}
          className="flex justify-center hover:text-themeBlue-600 underline"
        >
          Sign Up
        </Link>
      </section>
    </>
  );
}
