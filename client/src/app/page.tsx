"use client";
import JoinButton from "@/components/JoinButton";
import { useEffect } from "react";
import socketIo from "socket.io-client";

const ws = "http://localhost:8000";

export default function Home() {
  useEffect(() => {
    socketIo(ws);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <JoinButton />
    </main>
  );
}
