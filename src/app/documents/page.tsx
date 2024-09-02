'use client'

import {
  ArrowDownNarrowWide,
  ArrowUpNarrowWide,
  Book,
  Boxes,
  File,
  FileText,
  GraduationCap,
  Video
} from 'lucide-react'
import Link from 'next/link'
import { useCallback, useMemo, useState } from 'react'

import { ResourceType } from '@/__generated__/graphql'
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
import { GET_MY_RESOURCES } from '@/http/requests/resource'
import { useGraphQL } from '@/http/useGraphql'

function Documents() {
  const { data: resources, isLoading: resourcesLoading } = useGraphQL(GET_MY_RESOURCES)

  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<ResourceType | 'All'>('All')
  const [sortType, setSortType] = useState<'date:asc' | 'date:desc' | 'title:asc' | 'title:desc'>(
    'date:asc'
  )

  const getCategoryButtonLabel = useCallback(() => {
    switch (selectedCategory) {
      case ResourceType.Diploma:
        return 'Diplome'
      case ResourceType.Document:
        return 'Document'
      case ResourceType.Invoice:
        return 'Invoice'
      case ResourceType.Tutorial:
        return 'Tuto'
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
    const filtered = resources?.getMyResources.filter(resource => {
      if (search.length > 0 && !resource.name.toLowerCase().includes(search.toLowerCase())) {
        return false
      }
      if (selectedCategory !== 'All' && resource.type !== selectedCategory) {
        return false
      }
      return true
    })

    if (!filtered) return []

    if (sortType) {
      const [key, order] = sortType.split(':') as ['date' | 'title', 'asc' | 'desc']
      filtered.sort((a, b) => {
        if (key === 'date') {
          const compare = order === 'asc' ? [a.createdAt, b.createdAt] : [b.createdAt, a.createdAt]
          return new Date(compare[0]).getTime() - new Date(compare[1]).getTime()
        }

        const compare = order === 'asc' ? [a.name, b.name] : [b.name, a.name]
        return compare[0].localeCompare(compare[1])
      })
    }
    return filtered
  }, [resources, search, selectedCategory, sortType])

  return (
    <Dashboard
      actualState="documents"
      headerOptions={{
        title: 'Documents'
      }}
    >
      <div className="flex flex-wrap items-center gap-4 justify-between">
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
                    <Boxes className="mr-2 h-4 w-4" />
                    <span>Tous</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedCategory(ResourceType.Diploma)}>
                    <GraduationCap className="mr-2 h-4 w-4" />
                    <span>Diplome</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedCategory(ResourceType.Document)}>
                    <Book className="mr-2 h-4 w-4" />
                    <span>Document</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedCategory(ResourceType.Invoice)}>
                    <File className="mr-2 h-4 w-4" />
                    <span>Invoice</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedCategory(ResourceType.Tutorial)}>
                    <Video className="mr-2 h-4 w-4" />
                    <span>Tuto</span>
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
      <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-4 my-8">
        {!resourcesLoading &&
          filteredDocuments.map(resource => (
            <Card key={resource.id}>
              <CardHeader className="flex flex-col items-center justify-center">
                <FileText className="h-12 w-12" />
              </CardHeader>
              <CardContent className="grid">
                <Link
                  target="_blank"
                  href={resource.link}
                  className="underline text-sky-700 text-center"
                  rel="noopener noreferrer"
                >
                  {resource.name}
                </Link>
                <p className="text-right text-gray-300 text-sm mt-3">
                  {new Date(resource.createdAt).toLocaleDateString()}
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
