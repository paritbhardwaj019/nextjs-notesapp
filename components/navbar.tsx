import {
  RegisterLink,
  LogoutLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unbounded } from "@/app/layout";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

export async function Navbar() {
  const { isAuthenticated } = getKindeServerSession();

  return (
    <nav className="border-b bg-background h-[10vh] flex items-center">
      <div className="container flex items-center justify-between">
        <Link href="/" className={cn("font-bold text-xl", unbounded.className)}>
          Notes{" "}
          <span className="text-primary text-xs bg-secondary px-3 py-1 ml-1 rounded-lg">
            application
          </span>
        </Link>

        <div className="flex items-center gap-x-5">
          <Link
            href="/dashboard"
            className="font-light hover:underline text-sm"
          >
            Dashboard
          </Link>
          <ThemeToggle />

          {(await isAuthenticated()) ? (
            <LogoutLink>
              <Button variant="destructive" size="icon">
                <LogOut className="h-4 w-4" />
              </Button>
            </LogoutLink>
          ) : (
            <div className="flex items-center gap-x-5">
              <LoginLink>
                <Button>Sign In</Button>
              </LoginLink>
              <RegisterLink>
                <Button variant="secondary">Sign Up</Button>
              </RegisterLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
