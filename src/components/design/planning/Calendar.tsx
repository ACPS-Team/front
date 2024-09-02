import { Reservation } from '@/__generated__/graphql'

import { PlanningCells } from './components/Cells'
import { PlanningDays } from './components/Days'
import { PlanningHeader } from './components/Header'

interface CalendarProps {
  currentMonth: Date
  prevMonth: () => void
  nextMonth: () => void
  selectedDate: Date
  setSelectedDate: (date: Date) => void
  reservations: Reservation[]
  handleSelectReservation: (reservation: Reservation) => void
}

export function Calendar({
  currentMonth,
  prevMonth,
  nextMonth,
  selectedDate,
  setSelectedDate,
  reservations,
  handleSelectReservation
}: Readonly<CalendarProps>) {
  return (
    <div className="hidden sm:block p-4 min-w-[600px]">
      <PlanningHeader currentMonth={currentMonth} prevMonth={prevMonth} nextMonth={nextMonth} />
      <PlanningDays />
      <PlanningCells
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        reservations={reservations}
        handleSelectReservation={handleSelectReservation}
      />
    </div>
  )
}
