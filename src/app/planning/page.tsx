'use client'

import { addDays, format, subDays } from 'date-fns'
import { useState } from 'react'

import { Reservation } from '@/__generated__/graphql'
import { AuthGuard } from '@/components/AuthGuard'
import Dashboard from '@/components/Dashboard'
import { DialogNewReservation } from '@/components/design/dialog/NewReservation'
import { DialogReservation } from '@/components/design/dialog/Reservation'
import { PlanningAirplane } from '@/components/design/planning/Airplane'
import { DayView } from '@/components/design/planning/DayView'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

function Planning() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedReservation, setSelectedReservation] = useState(null)
  const [isDialogNewReservationOpen, setIsDialogNewReservationOpen] = useState(false)

  const reservations = [
    {
      id: '1',
      startDate: new Date(),
      duration: 120, // 2 hours
      instructor: { name: 'Jane Smith' },
      airplane: { name: 'Cessna 172' }
    },
    {
      id: '2',
      startDate: new Date(new Date().setHours(new Date().getHours() + 3)),
      duration: 60, // 1 hour
      user: { name: 'Alice Johnson' },
      instructor: { name: 'Bob Brown' },
      airplane: { name: 'Piper PA-28' }
    },
    {
      id: '3',
      startDate: new Date(new Date().setDate(new Date().getDate() + 1)),
      duration: 90, // 1.5 hours
      user: { name: 'Charlie Clark' },
      instructor: { name: 'Dave White' },
      airplane: { name: 'Beechcraft Bonanza' }
    }
  ]

  const nextDay = () => {
    const newDate = addDays(selectedDate, 1)
    setSelectedDate(newDate)
  }

  const prevDay = () => {
    const newDate = subDays(selectedDate, 1)
    setSelectedDate(newDate)
  }

  const handleSelectReservation = (reservation: any) => {
    setSelectedReservation(reservation)
  }

  return (
    <Dashboard
      actualState="planning"
      headerOptions={{
        title: 'Planning'
      }}
    >
      <div className="flex flex-col gap-4 sm:grid sm:grid-cols-3 mb-8">
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
        <Card>
          <CardHeader>
            <CardTitle>Nombre de vols ce mois-ci</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <p>{reservations.length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center mb-16 mt-12">
        <button onClick={prevDay} className="text-xl font-semibold">
          &lt;
        </button>
        <h2 className="text-2xl font-bold">{format(selectedDate, 'EEEE d MMMM yyyy')}</h2>
        <button onClick={nextDay} className="text-xl font-semibold">
          &gt;
        </button>
      </div>

      <PlanningAirplane
        reservations={reservations as unknown as Reservation[]}
        currentDay={selectedDate}
        onSelectReservation={handleSelectReservation}
      />

      <div className="mt-16" />

      <DayView
        selectedDate={selectedDate}
        reservations={reservations as unknown as Reservation[]}
        onSelectReservation={handleSelectReservation}
      />

      <DialogReservation
        reservation={selectedReservation as unknown as Reservation}
        onClose={() => setSelectedReservation(null)}
      />

      <DialogNewReservation
        isOpen={isDialogNewReservationOpen}
        onClose={() => setIsDialogNewReservationOpen(false)}
      />
    </Dashboard>
  )
}

export default function AuthPlanning() {
  return <AuthGuard render={Planning} />
}
