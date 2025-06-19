'use client'

import { Plane } from 'lucide-react'
import { useState } from 'react'

import { AuthGuard } from '@/components/AuthGuard'
import Dashboard from '@/components/Dashboard'
import { DialogNewReservation } from '@/components/design/dialog/NewReservation'
import { TableCard } from '@/components/design/TableCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

function Flights() {
  const [isDialogNewReservationOpen, setIsDialogNewReservationOpen] = useState(false)

  return (
    <Dashboard
      actualState="flights"
      headerOptions={{
        title: 'Mes vols'
      }}
    >
      <div className="flex flex-col gap-4 sm:grid sm:grid-cols-3 ">
        <Card>
          <CardHeader>
            <CardTitle>Envie d&apos;un vol ?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-4">
              <Button size="sm" onClick={() => setIsDialogNewReservationOpen(true)}>
                Réserver un vol
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className={'bg-gradient-to-br from-blue-200'}>
          <CardHeader>
            <CardTitle>Nombre de vols passés</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <p>10</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Dernier vol</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <p>Le 12 janvier</p>
            <p>à</p>
            <p>9h00 avec le F-231</p>
          </CardContent>
        </Card>
      </div>
      <TableCard
        icon={<Plane />}
        title="Mes vols à venir / en cours"
        headers={['Date', 'Immat', 'Type', 'FI', 'Commentaire', 'Att', 'Sep (Cdt/PIC)', 'SEP(DC/Dual)']}
        rows={<p>Aucune donnée disponible</p>}
        isLoaded
      />
      <TableCard
        icon={<Plane />}
        title="Mes vols passés"
        headers={['Date', 'Immat', 'Type', 'FI', 'Commentaire', 'Att', 'Sep (Cdt/PIC)', 'SEP(DC/Dual)']}
        rows={<p>Aucune donnée disponible</p>}
        isLoaded
      />

      <DialogNewReservation
        airplanes={["Cessna 172", "Piper PA-28", "Beechcraft Bonanza"]}
        isOpen={isDialogNewReservationOpen}
        onClose={() => setIsDialogNewReservationOpen(false)}
      />
    </Dashboard>
  )
}

export default function AuthFlights() {
  return <AuthGuard render={Flights} />
}
