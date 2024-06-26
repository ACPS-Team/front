"use client";

import { useUser } from "@clerk/clerk-react";
import { SignIn } from "./design/auth/SignIn";
import type { UserResource } from "@clerk/types";

type AuthGuardsProps<T extends object = {}> = {
  render: React.FC<{ user: UserResource } & T>;
  props?: T;
};

export const AuthGuard = <T extends object>({ render: InnerComponent, props }: Readonly<AuthGuardsProps<T>>) => {
  const { user } = useUser();

  if (!user) {
    return <SignIn />;
  }

  return <InnerComponent user={user} {...(props as T)} />;
};
