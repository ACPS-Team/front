import { format } from 'date-fns'

import { Reservation } from '@/__generated__/graphql'

interface DayCellProps {
  day: Date
  isCurrentMonth: boolean
  isSelected: boolean
  reservations: Reservation[]
  onSelectDate: (date: Date) => void
  onSelectReservation: (reservation: Reservation) => void
}

export function DayCell({
  day,
  isCurrentMonth,
  isSelected,
  reservations,
  onSelectDate,
  onSelectReservation
}: Readonly<DayCellProps>) {
  return (
    <div
      key={day.toString()}
      className={`p-2 border h-32 ${isCurrentMonth ? 'bg-white' : 'bg-gray-100'} cursor-pointer`}
      onClick={() => onSelectDate(day)}
    >
      <div className={`text-right ${isSelected ? 'text-blue-500 font-bold' : ''}`}>
        {format(day, 'd')}
      </div>
      {reservations.map(reservation => (
        <div
          key={reservation.id}
          onClick={e => {
            e.stopPropagation()
            onSelectReservation(reservation)
            console.log('Reservation clicked')
          }}
          className="text-xs bg-primary text-white rounded-md mt-1 p-1"
        >
          Jack - {reservation.airplane.name}
        </div>
      ))}
    </div>
  )
}
