'use client'

import { Book, Plus } from 'lucide-react'

import { AuthGuard } from '@/components/AuthGuard'
import Dashboard from '@/components/Dashboard'
import { TableCard } from '@/components/design/TableCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TableCell, TableRow } from '@/components/ui/table'

function Lessons() {
  const absences = 3

  const handleAddToCalendar = () => {
    console.log('Add to calendar')
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
      <div className="flex flex-col gap-4 sm:grid sm:grid-cols-3 ">
        <Card>
          <CardHeader>
            <CardTitle>Prochain cours</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <p>{new Date().toLocaleDateString()}</p>
            <p>à</p>
            <p>{new Date().toLocaleTimeString()}</p>
            <Button className="mt-4" onClick={handleAddToCalendar}>
              Ajouter à mon agenda
            </Button>
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
      <TableCard
        icon={<Book />}
        title="Mes cours passés"
        headers={['Nom', 'Date']}
        isLoaded
        rows={
          <TableRow>
            <TableCell>Cours PPL</TableCell>
            <TableCell>{new Date().toLocaleDateString()}</TableCell>
          </TableRow>
        }
      />
    </Dashboard>
  )
}

export default function AuthLessons() {
  return <AuthGuard render={Lessons} />
}
