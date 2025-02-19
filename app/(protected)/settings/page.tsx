import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

const SettingsPage = async () => {
  const session = await auth();
  session?.user.role;
  return (
    <div className="h-screen">
      {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button type="submit">Sign Out</Button>
      </form>
    </div>
  );
};

export default SettingsPage;
