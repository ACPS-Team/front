'use client'

import { Plane, User, Users } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useState } from 'react'

import { AuthGuard } from '@/components/AuthGuard'
import Dashboard from '@/components/Dashboard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'

function Organisation() {
  const users = [
    {
      id: 0,
      firstName: 'Bernard',
      lastName: 'Dupont',
      email: 'a@a.a',
      group: 'Admin'
    },
    {
      id: 1,
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'a@a.a',
      group: 'Admin'
    },
    {
      id: 2,
      firstName: 'John',
      lastName: 'Kick',
      email: 'a@a.a',
      group: 'Pilotes'
    },
    {
      id: 3,
      firstName: 'Fred',
      lastName: 'Pack',
      email: 'a@a.a',
      group: 'Pilotes'
    },
    {
      id: 4,
      firstName: 'Alice',
      lastName: 'Smith',
      email: 'a@a.a',
      group: 'Mécanicien'
    },
    {
      id: 5,
      firstName: 'Bob',
      lastName: 'Brown',
      email: 'a@a.a',
      group: 'FI'
    },
    {
      id: 6,
      firstName: 'Charlie',
      lastName: 'Johnson',
      email: 'a@a.a',
      group: 'Eleves'
    },
    {
      id: 7,
      firstName: 'Diana',
      lastName: 'White',
      email: 'a@a.a',
      group: 'Breveté'
    }
  ]

  const [selectedGroup, setSelectedGroup] = useState('All')
  const [search, setSearch] = useState('')

  const getButtonLabel = useCallback(() => {
    switch (selectedGroup) {
      case 'Admin':
        return 'Administrateurs'
      case 'Pilotes':
        return 'Pilotes'
      case 'Mécanicien':
        return 'Mécanicien'
      case 'FI':
        return 'FI'
      case 'Eleves':
        return 'Eleves'
      case 'Breveté':
        return 'Breveté'
      default:
        return 'Tous'
    }
  }, [selectedGroup])

  return (
    <Dashboard
      actualState="organisation"
      headerOptions={{
        title: 'Trombinoscope'
      }}
    >
      <div className="flex flex-wrap items-center gap-4 justify-between">
        <Input
          placeholder="Rechercher une personne..."
          className="max-w-[450px]"
          onChange={e => setSearch(e.target.value)}
        />
        <div className="flex items-center gap-2">
          <p>Filtres:</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">{getButtonLabel()}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setSelectedGroup('All')}>
                  <Users className="mr-2 h-4 w-4" />
                  <span>Tous</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedGroup('Admin')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Administrateurs</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedGroup('Pilotes')}>
                  <Plane className="mr-2 h-4 w-4" />
                  <span>Pilotes</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedGroup('Mécanicien')}>
                  <Plane className="mr-2 h-4 w-4" />
                  <span>Mécanicien</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedGroup('FI')}>
                  <Plane className="mr-2 h-4 w-4" />
                  <span>FI</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedGroup('Eleves')}>
                  <Plane className="mr-2 h-4 w-4" />
                  <span>Elèves</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedGroup('Breveté')}>
                  <Plane className="mr-2 h-4 w-4" />
                  <span>Breveté</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-4 my-8">
        {users
          .filter(user => {
            if (search.length > 0) {
              return (
                user.firstName.toLowerCase().includes(search.toLowerCase()) ||
                user.lastName.toLowerCase().includes(search.toLowerCase())
              )
            }
            if (selectedGroup === 'All') return true
            return user.group === selectedGroup
          })
          .map(user => (
            <Card key={user.id} className="min-w-48">
              <CardHeader className="flex flex-col items-center justify-center">
                <Image
                  src="/placeholder.svg"
                  alt="avatar"
                  width={75}
                  height={75}
                  className="w-[75%]"
                />
              </CardHeader>
              <CardContent>
                <p>
                  {user.firstName} {user.lastName}
                </p>
                <p>{user.email}</p>
              </CardContent>
            </Card>
          ))}
      </div>
    </Dashboard>
  )
}

export default function AuthOrganisation() {
  return <AuthGuard render={Organisation} />
}
