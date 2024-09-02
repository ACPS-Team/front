'use client'

import { addMonths, subMonths } from 'date-fns'
import { useState } from 'react'

import { Reservation } from '@/__generated__/graphql'
import { AuthGuard } from '@/components/AuthGuard'
import Dashboard from '@/components/Dashboard'
import { Calendar } from '@/components/design/planning/Calendar'
import { DayView } from '@/components/design/planning/DayView'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

function Planning() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedReservation, setSelectedReservation] = useState(null)

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

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1))

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
            <form onSubmit={() => {}} className="flex flex-col items-center gap-4">
              <Button size="sm">Réserver un vol</Button>
            </form>
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
      <Calendar
        currentMonth={currentMonth}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        reservations={reservations as unknown as Reservation[]}
        handleSelectReservation={handleSelectReservation}
      />

      <div className="mt-16" />

      <DayView
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        reservations={reservations as unknown as Reservation[]}
      />
    </Dashboard>
  )
}

export default function AuthPlanning() {
  return <AuthGuard render={Planning} />
}
