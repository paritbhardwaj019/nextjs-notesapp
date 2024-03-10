import { Button } from "../ui/button";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function Hero() {
  const { isAuthenticated } = getKindeServerSession();

  return (
    <section className="bg-background w-full">
      <div className="mx-auto container px-4 py-20 lg:flex lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Elevate Your Workflow.
            <strong className="font-extrabold text-primary sm:block">
              {" "}
              Capture, Organize, Succeed.{" "}
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed">
            Join the ranks of satisfied users who have revolutionized their
            productivity with Notesapp. Start your journey towards success
            today.
          </p>

          {!(await isAuthenticated()) && (
            <div className="flex justify-center max-w-xs mx-auto mt-10">
              <RegisterLink>
                <Button className="w-full" size="lg">
                  Sign Up for free
                </Button>
              </RegisterLink>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
