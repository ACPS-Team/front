import { format } from 'date-fns'

import type { Reservation } from '@/__generated__/graphql'

interface CalendarProps {
  selectedDate: Date
  reservations: Reservation[]
  onSelectReservation: (reservation: Reservation) => void
}

export function DayView({
  selectedDate,
  reservations,
  onSelectReservation
}: Readonly<CalendarProps>) {
  const filteredReservations = reservations.filter(
    reservation =>
      format(new Date(reservation.startDate), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
  )

  return (
    <div className="p-4">
      <div className="space-y-4">
        {filteredReservations.length > 0 ? (
          filteredReservations.map(reservation => (
            <button
              key={reservation.id}
              className="bg-white shadow rounded-lg p-4 cursor-pointer w-full text-left border-0"
              onClick={() => onSelectReservation(reservation)}
              type="button"
              aria-label={`Réservation ${format(new Date(reservation.startDate), 'HH:mm')}`}
            >
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">
                  {format(new Date(reservation.startDate), 'HH:mm')} -
                  {format(
                    new Date(
                      new Date(reservation.startDate).getTime() + reservation.duration * 60000
                    ),
                    'HH:mm'
                  )}
                </span>
                <span className="text-sm text-gray-500">{reservation.duration} min</span>
              </div>
              <div className="mt-2">
                <p>
                  <strong>Avion:</strong> {reservation.airplane.name}
                </p>
                {/* <p>
                  <strong>Instructeur:</strong> {reservation.instructor.name}
                </p> */}
                {/* {reservation.user && (
                  <p>
                    <strong>Élève:</strong> {reservation.user.name}
                  </p>
                )} */}
              </div>
            </button>
          ))
        ) : (
          <p className="text-center text-gray-500">Aucune réservation pour ce jour.</p>
        )}
      </div>
    </div>
  )
}
