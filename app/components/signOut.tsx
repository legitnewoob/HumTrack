"use client";

import { signOut } from "next-auth/react";

const SignOutButton: React.FC = () => {
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <button
      onClick={handleSignOut}
      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;