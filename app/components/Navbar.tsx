"use client";

import React from "react";
import { Layout } from "lucide-react";
import { useSession, signOut, signIn } from "next-auth/react";
import Link from "next/link";

const Navbar: React.FC = () => {
  const { data: session } = useSession(); // Check if user is logged in

  return (
    <nav className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg rounded-b-2xl">
      <div className="w-full px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-16 w-full">
          {/* Left Side - Logo and App Name */}
          <Link href="/" className="flex items-center">
            <Layout className="h-8 w-8 text-purple-500" />
            <span className="ml-2 text-2xl font-bold">HumTrack</span>
          </Link>

          {/* Right Side - Links */}
          <div className="flex items-center space-x-6">
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-gray-300 hover:text-white text-sm font-medium transition"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })} // Sign out
                  className="relative px-4 py-2 bg-red-500 rounded-lg text-white font-medium transition-all overflow-hidden 
                  before:absolute before:left-0 before:top-0 before:w-0 before:h-full before:bg-gradient-to-r before:from-red-600 before:to-red-400 
                  before:opacity-50 before:transition-all before:duration-300 before:hover:w-full"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })} // Direct OAuth Google
                className="relative px-4 py-2 bg-blue-500 rounded-lg text-white font-medium transition-all overflow-hidden 
                  before:absolute before:left-0 before:top-0 before:w-0 before:h-full before:bg-gradient-to-r before:from-blue-600 before:to-blue-400 
                  before:opacity-50 before:transition-all before:duration-300 before:hover:w-full"
              >
                Sign In with Google
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
