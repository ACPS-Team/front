'use client'

import { ArrowDownNarrowWide, ArrowUpNarrowWide, FileText, Plane, User, Users } from 'lucide-react'
import Link from 'next/link'
import { useCallback, useMemo, useState } from 'react'

import { AuthGuard } from '@/components/AuthGuard'
import Dashboard from '@/components/Dashboard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'

function Documents() {
  const documents = useMemo(
    () => [
      {
        id: 0,
        title: 'Facture 1',
        date: new Date().getTime() - 100000000,
        link: 'https://www.google.com',
        category: 'Finance'
      },
      {
        id: 1,
        title: 'Facture 2',
        date: new Date().getTime(),
        link: 'https://www.google.com',
        category: 'Finance'
      },
      {
        id: 2,
        title: 'Facture 3',
        date: new Date().getTime(),
        link: 'https://www.google.com',
        category: 'Finance'
      },
      {
        id: 3,
        title: 'Facture 4',
        date: new Date().getTime(),
        link: 'https://www.google.com',
        category: 'Finance'
      },
      {
        id: 4,
        title: 'Permis',
        date: new Date().getTime(),
        link: 'https://www.google.com',
        category: 'Administrative'
      }
    ],
    []
  )

  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Finance' | 'Administrative'>(
    'All'
  )
  const [sortType, setSortType] = useState<'date:asc' | 'date:desc' | 'title:asc' | 'title:desc'>(
    'date:asc'
  )

  const getCategoryButtonLabel = useCallback(() => {
    switch (selectedCategory) {
      case 'Administrative':
        return 'Administrative'
      case 'Finance':
        return 'Finance'
      default:
        return 'Tous'
    }
  }, [selectedCategory])

  const getSortButtonLabel = useCallback(() => {
    switch (sortType) {
      case 'date:asc':
        return 'Date croissant'
      case 'date:desc':
        return 'Date décroissant'
      case 'title:asc':
        return 'A-Z croissant'
      case 'title:desc':
        return 'A-Z décroissant'
      default:
        return 'Date décroissant'
    }
  }, [sortType])

  const filteredDocuments = useMemo(() => {
    const filtered = documents.filter(document => {
      if (search.length > 0 && !document.title.toLowerCase().includes(search.toLowerCase())) {
        return false
      }
      if (selectedCategory !== 'All' && document.category !== selectedCategory) {
        return false
      }
      return true
    })

    if (sortType) {
      const [key, order] = sortType.split(':') as ['date' | 'title', 'asc' | 'desc']
      filtered.sort((a, b) => {
        if (key === 'date') {
          return order === 'asc'
            ? new Date(a[key]).getTime() - new Date(b[key]).getTime()
            : new Date(b[key]).getTime() - new Date(a[key]).getTime()
        }

        return order === 'asc' ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key])
      })
    }
    return filtered
  }, [documents, search, selectedCategory, sortType])

  return (
    <Dashboard
      actualState="documents"
      headerOptions={{
        title: 'Documents'
      }}
    >
      <div className="flex items-center gap-4 justify-between">
        <Input
          placeholder="Rechercher un document..."
          className="max-w-[450px]"
          onChange={e => setSearch(e.target.value)}
        />
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <p>Filtres:</p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">{getCategoryButtonLabel()}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => setSelectedCategory('All')}>
                    <Users className="mr-2 h-4 w-4" />
                    <span>Tous</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedCategory('Finance')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Finance</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedCategory('Administrative')}>
                    <Plane className="mr-2 h-4 w-4" />
                    <span>Administratif</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center gap-2">
            <p>Trier par:</p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">{getSortButtonLabel()}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => setSortType('date:asc')}>
                    <ArrowUpNarrowWide className="mr-2 h-4 w-4" />
                    <span>Date croissant</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortType('date:desc')}>
                    <ArrowDownNarrowWide className="mr-2 h-4 w-4" />
                    <span>Date décroissant</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => setSortType('title:asc')}>
                    <ArrowUpNarrowWide className="mr-2 h-4 w-4" />
                    <span>A-Z croissant</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortType('title:desc')}>
                    <ArrowDownNarrowWide className="mr-2 h-4 w-4" />
                    <span>A-Z décroissant</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 my-8">
        {filteredDocuments.map(document => (
          <Card key={document.id}>
            <CardHeader className="flex flex-col items-center justify-center">
              <FileText className="h-12 w-12" />
            </CardHeader>
            <CardContent className="grid">
              <Link
                target="_blank"
                href={document.link}
                className="underline text-sky-700 text-center"
                rel="noopener noreferrer"
              >
                {document.title}
              </Link>
              <p className="text-right text-gray-300 text-sm mt-3">
                {new Date(document.date).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Dashboard>
  )
}

export default function AuthDocuments() {
  return <AuthGuard render={Documents} />
}
