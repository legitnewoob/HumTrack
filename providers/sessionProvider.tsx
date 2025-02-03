
"use client";
import '@/globals.css';
import { SessionProvider } from "next-auth/react";

export const metadata = {
    title: 'Task Manager',
    description: 'A modern task management app',
  };

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
            {children}
        </SessionProvider>
      </body>
    </html>
  );
}