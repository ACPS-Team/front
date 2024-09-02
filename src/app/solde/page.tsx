'use client'

import { Book } from 'lucide-react'

import { AuthGuard } from '@/components/AuthGuard'
import Dashboard from '@/components/Dashboard'
import { TableCard } from '@/components/design/TableCard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TableCell, TableRow } from '@/components/ui/table'

function Solde() {
  const amount = 300

  return (
    <Dashboard
      actualState="solde"
      headerOptions={{
        title: 'Solde'
      }}
    >
      <div className="flex flex-col gap-8 sm:grid sm:grid-cols-2 w-full lg:w-[70%] ">
        <Card
          className={`bg-gradient-to-br from-${amount >= 0 ? 'sky' : 'red'}-200 from-0% to-white to-85%`}
        >
          <CardHeader>
            <CardTitle>Solde</CardTitle>
            <CardDescription>Solde de votre compte</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center text-3xl font-semibold">{amount} €</p>
          </CardContent>
        </Card>
      </div>
      <TableCard
        icon={<Book />}
        title="Mes transactions"
        headers={['Montant', 'Type', 'Date']}
        isLoaded
        rows={
          <TableRow>
            <TableCell>300€</TableCell>
            <TableCell>Recharge</TableCell>
            <TableCell>{new Date().toLocaleDateString()}</TableCell>
          </TableRow>
        }
      />
    </Dashboard>
  )
}

export default function AuthSolde() {
  return <AuthGuard render={Solde} />
}
