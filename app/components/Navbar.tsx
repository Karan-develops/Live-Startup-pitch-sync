import Link from "next/link";
import React from "react";
import { auth, signOut, signIn } from "@/auth";
import {
  CirclePlus,
  CircleUserRound,
  Github,
  LogOut,
  Waypoints,
} from "lucide-react";

const Navbar = async () => {
  const session = await auth();
  return (
    <header className="px-5 py-3 bg-black shadow-200 font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href={"/"}>
          <span className="flex text-3xl ml-8 text-white">
            <span className="text-emerald-500">Pitch</span>-Sync{" "}
            <Waypoints className="mt-[6px] ml-1" />
          </span>
        </Link>

        <div className="flex items-center gap-5 text-white">
          {session && session?.user ? (
            <>
              <Link href={"/startup/create"}>
                <span className="flex text-lg gap-1 relative group text-gray-300 hover:text-cyan-400 transition duration-300 ease-in-out hover:cursor-pointer">
                  <span>Create</span> <CirclePlus className="mt-[2px]" />{" "}
                </span>
              </Link>
              <button
                onClick={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <span className="flex text-lg gap-1 relative group text-gray-300 hover:text-red-500 transition duration-300 ease-in-out hover:cursor-pointer">
                  <span>LogOut</span>
                  <LogOut className="mt-[2px]" />
                </span>
              </button>

              <Link href={`/user/${session?.user?.id}`}>
                <span className="flex rounded-full border border-white bg-black px-5 p-2 text-lg text-white transition duration-300 hover:bg-white hover:text-black gap-1">
                  <CircleUserRound />
                  {session?.user?.name}
                </span>
              </Link>
            </>
          ) : (
            <button
              className="rounded-full border border-white bg-black px-5 p-2 text-white transition duration-300 hover:bg-white hover:text-black gap-1"
              onClick={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <span className="flex gap-2 text-lg">
                Login <Github />{" "}
              </span>
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
