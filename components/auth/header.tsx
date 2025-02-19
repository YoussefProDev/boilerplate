import React from "react";

//Font
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { HomePage } from "@/route";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});
interface headerProps {
  label: string;
}
export const Header = ({ label }: headerProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <Link
        href={HomePage}
        className={cn("text-3xl font-semibold", font.className)}
      >
        🔐 Auth
      </Link>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};
