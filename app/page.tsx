"use client"
import { UserButton } from "@clerk/clerk-react";

export default function Home() {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="">This is a screen for authentication.</div>
      <div className=""><UserButton/></div>
    </div>
  );
}
