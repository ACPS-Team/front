'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function SignIn() {
  // const { signIn, isLoaded } = useSignIn()
  const [error, setError] = useState<string | null>(null)

  if (!isLoaded) {
    return null
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const result = await signIn.create({
        identifier: e.currentTarget.email.value,
        password: e.currentTarget.password.value
      })
      if (result.status === 'complete') {
        console.log('Sign in successful')
        window.location.reload()
        return
      }
    } catch (err) {
      console.error('Error during sign in', err)
    }
    setError('Identifiants incorrects')
  }

  return (
    <div className="w-full h-screen overflow-hidden lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Se connecter</h1>
            <p className="text-balance text-muted-foreground">
              Entre tes identifiants pour pouvoir te connecter
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Link href="/forgot-password" className="ml-auto inline-block text-sm underline">
                    Mot de passe oublié ?
                  </Link>
                </div>
                <Input id="password" type="password" name="password" required />
              </div>
              {error && <div className="text-red-500 text-center">{error}</div>}
              <Button type="submit" className="w-full">
                Se connecter
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
