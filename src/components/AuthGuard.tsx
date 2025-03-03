'use client'

import type React from 'react'

import { SignIn } from './design/auth/SignIn'

type AuthGuardsProps<T extends object = Record<string, never>> = {
  render: React.FC<{ user: { id: string } } & T>
  props?: T
}

export const AuthGuard = <T extends object>({
  render: InnerComponent,
  props
}: Readonly<AuthGuardsProps<T>>) => {
  // const { user } = useUser()
  const user = { id: 'a' }

  if (!user) {
    return <SignIn />
  }

  return <InnerComponent user={user} {...(props as T)} />
}
