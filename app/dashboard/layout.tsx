import React from "react";
import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe";

async function getData({
  email,
  id,
  firstName,
  lastName,
  profileImage,
}: {
  email: string;
  id: string;
  firstName: string | undefined | null;
  lastName: string | undefined | null;
  profileImage: string | undefined | null;
}) {
  const user = await prisma.user.findUnique({
    where: { kindeId: id },
    select: {
      id: true,
      stripeCustomerId: true,
      kindeId: true,
    },
  });

  if (!user) {
    const name = `${firstName ?? ""} ${lastName ?? ""}`;
    await prisma.user.create({
      data: {
        kindeId: id,
        email,
        name,
      },
    });
  }

  if (!user?.stripeCustomerId) {
    const data = await stripe.customers.create({
      email,
    });

    await prisma.user.update({
      where: {
        kindeId: id,
      },
      data: {
        stripeCustomerId: data.id,
      },
    });
  }
}

export default async function ({ children }: { children: React.ReactNode }) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  await getData({
    email: user.email as string,
    firstName: user.given_name as string,
    lastName: user.family_name as string,
    id: user.id as string,
    profileImage: user.picture as string,
  });

  return (
    <div className="flex flex-col space-y-6 mt-10">
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav />
        </aside>
        <main>{children}</main>
      </div>
    </div>
  );
}
