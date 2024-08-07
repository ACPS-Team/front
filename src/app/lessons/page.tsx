'use client'

import { Book, Plus } from 'lucide-react'

import { AuthGuard } from '@/components/AuthGuard'
import Dashboard from '@/components/Dashboard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table'

function Lessons() {
  const absences = 3

  const handleJoinCourse = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <Dashboard
      actualState="lessons"
      headerOptions={{
        title: 'Cours'
      }}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold mb-6 mt-2">Cours</h1>
        <Button size="sm" variant="outline">
          <Plus className="h-6 w-6 mr-2" />
          Créer un cours
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Rejoindre un cours</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleJoinCourse} className="flex flex-col items-center gap-4">
              <Input placeholder="Code du cours" />
              <Button size="sm">Rejoindre</Button>
            </form>
          </CardContent>
        </Card>
        <Card className={`bg-gradient-to-br from-${absences > 0 ? 'red' : 'slate'}-200`}>
          <CardHeader>
            <CardTitle>Nombre d&apos;absence</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <p>{absences} jours d&apos;absences</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Dernier cours</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <p>{new Date().toLocaleDateString()}</p>
            <p>à</p>
            <p>{new Date().toLocaleTimeString()}</p>
          </CardContent>
        </Card>
      </div>
      <Card className="my-8">
        <CardHeader>
          <CardTitle className="flex gap-2">
            <Book />
            Mes cours passés
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Nom</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Cours PPL</TableCell>
                <TableCell>{new Date().toLocaleDateString()}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Dashboard>
  )
}

export default function AuthLessons() {
  return <AuthGuard render={Lessons} />
}
