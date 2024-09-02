'use client'

import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek
} from 'date-fns'
import { useMemo } from 'react'

import { Reservation } from '@/__generated__/graphql'

import { DayCell } from './DayCell'

interface CellsProps {
  currentMonth: Date
  selectedDate: Date
  setSelectedDate: (date: Date) => void
  reservations: Reservation[]
  handleSelectReservation: (reservation: Reservation) => void
}

export function PlanningCells({
  currentMonth,
  selectedDate,
  setSelectedDate,
  reservations,
  handleSelectReservation
}: Readonly<CellsProps>) {
  const { monthStart, startDate, endDate } = useMemo(() => {
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(monthStart)
    return {
      monthStart,
      monthEnd,
      startDate: startOfWeek(monthStart),
      endDate: endOfWeek(monthEnd)
    }
  }, [currentMonth])

  const reservationsByDate = useMemo(() => {
    return reservations.reduce(
      (acc, reservation) => {
        const dateKey = format(new Date(reservation.startDate), 'yyyy-MM-dd')
        if (!acc[dateKey]) acc[dateKey] = []
        acc[dateKey].push(reservation)
        return acc
      },
      {} as Record<string, Reservation[]>
    )
  }, [reservations])

  const rows = useMemo(() => {
    const rows = []
    let days = []
    let day = startDate

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const dateKey = format(day, 'yyyy-MM-dd')
        const dayReservations = reservationsByDate[dateKey] || []
        const isCurrentMonth = isSameMonth(day, monthStart)
        const isSelected = isSameDay(day, selectedDate)
        days.push(
          <DayCell
            key={day.toString()}
            day={day}
            isCurrentMonth={isCurrentMonth}
            isSelected={isSelected}
            reservations={dayReservations}
            onSelectDate={setSelectedDate}
            onSelectReservation={handleSelectReservation}
          />
        )
        day = addDays(day, 1)
      }
      rows.push(
        <div className="grid grid-cols-7" key={day.toString()}>
          {days}
        </div>
      )
      days = []
    }

    return rows
  }, [
    monthStart,
    startDate,
    endDate,
    reservationsByDate,
    selectedDate,
    setSelectedDate,
    handleSelectReservation
  ])

  return <div>{rows}</div>
}
