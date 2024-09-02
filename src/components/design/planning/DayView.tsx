import { addDays, format, subDays } from 'date-fns'

import { Reservation } from '@/__generated__/graphql'

interface CalendarProps {
  selectedDate: Date
  setSelectedDate: (date: Date) => void
  reservations: Reservation[]
}

export function DayView({ selectedDate, setSelectedDate, reservations }: Readonly<CalendarProps>) {
  const nextDay = () => {
    const newDate = addDays(selectedDate, 1)
    setSelectedDate(newDate)
  }

  const prevDay = () => {
    const newDate = subDays(selectedDate, 1)
    setSelectedDate(newDate)
  }

  const filteredReservations = reservations.filter(
    reservation =>
      format(new Date(reservation.startDate), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
  )

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevDay} className="text-xl font-semibold">
          &lt;
        </button>
        <h2 className="text-2xl font-bold">{format(selectedDate, 'EEEE d MMMM yyyy')}</h2>
        <button onClick={nextDay} className="text-xl font-semibold">
          &gt;
        </button>
      </div>
      <div className="space-y-4">
        {filteredReservations.length > 0 ? (
          filteredReservations.map(reservation => (
            <div key={reservation.id} className="bg-white shadow rounded-lg p-4">
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
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Aucune réservation pour ce jour.</p>
        )}
      </div>
    </div>
  )
}
