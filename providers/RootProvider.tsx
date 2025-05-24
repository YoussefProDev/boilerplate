import { cn } from "@/lib/utils";
import { ThemeProvider } from "./ThemeProvider";

export default function RootProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        storageKey="app-theme"
      >
        {children}
      </ThemeProvider>
    </div>
  );
}
