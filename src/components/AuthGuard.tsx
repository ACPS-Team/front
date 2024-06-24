"use client";

import { useUser } from "@clerk/clerk-react";
import { SignIn } from "./design/auth/SignIn";

type AuthGuardsProps = {
  children: React.ReactNode;
};

export const AuthGuard = ({ children }: AuthGuardsProps) => {
  const { user } = useUser();

  if (!user) {
    return <SignIn />;
  }

  return <>{children}</>;
};
