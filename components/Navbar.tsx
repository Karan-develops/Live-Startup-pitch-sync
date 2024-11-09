import Link from "next/link";
import React from "react";
import { auth, signOut, signIn } from "@/auth";
import {
  CirclePlus,
  Github,
  LogOut,
  Waypoints,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Navbar = async () => {
  const session = await auth();
  return (
    <header className="px-5 py-3 bg-black shadow-200 font-work-sans border-b border-green-500">
      <nav className="flex justify-between items-center ">
        <Link href={"/"}>
          <span className="flex text-3xl ml-8 text-white max-sm:hidden">
            <span className="text-emerald-500">Pitch</span>-Sync{" "}
            <Waypoints className="mt-[6px] ml-1" />
          </span>
          <span className="flex text-2xl ml-1 text-white sm:hidden">
            <span className="text-emerald-500">Pitch</span>-Sync{" "}
            <Waypoints className="mt-[6px] ml-1" />
          </span>
        </Link>

        <div className="flex items-center gap-5 text-white">
          {session && session?.user ? (
            <>
              <Link href={"/startup/create"}>
                <span className="text-lg gap-1 relative group text-gray-300 hover:text-cyan-400 transition duration-300 ease-in-out hover:cursor-pointer">
                  <span className="flex gap-1 max-sm:hidden">
                    <span>Create</span> <CirclePlus className="mt-[2px]" />{" "}
                  </span>
                  <CirclePlus className="size-6 sm:hidden text-cyan-500" />
                </span>
              </Link>
              <button
                onClick={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <span className="text-lg gap-1 relative group text-gray-300 hover:text-red-500 transition duration-300 ease-in-out hover:cursor-pointer">
                  <span className="flex gap-1 max-sm:hidden">
                    <span>LogOut</span>
                    <LogOut className="mt-[2px]" />
                  </span>
                </span>
                <LogOut className="size-6 sm:hidden text-red-600" />
              </button>

              <Link href={`/user/${session?.id}`}>
                <span className="nav_user max-sm:hidden">
                  <Avatar className="size-10 ring-1 ring-white">
                    <AvatarImage
                      src={session?.user?.image || ""}
                      alt={session?.user?.name || ""}
                    />
                    <AvatarFallback>AV</AvatarFallback>
                  </Avatar>
                  <span className="max-sm:hidden mt-1">
                    {session?.user?.name}
                  </span>
                </span>
                <Avatar className="size-10 ring-1 ring-white sm:hidden">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || ""}
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
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
