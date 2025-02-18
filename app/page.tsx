import LoginButton from "@/components/auth/LoginButton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

//Font
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center  justify-center">
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            " text-6xl font-semibold  drop-shadow-md",
            font.className
          )}
        >
          🔐Auth
        </h1>
        <p className="text-lg">A Simple Authentication Service</p>

        <div>
          <LoginButton>
            <Button variant="secondary" size="lg">
              Sign In
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
