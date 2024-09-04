import { addMinutes, isSameDay } from 'date-fns'

import { Reservation } from '@/__generated__/graphql'

interface PlanningAirplaneProps {
  reservations: Reservation[]
  currentDay: Date
  onSelectReservation: (reservation: Reservation) => void
}

export function PlanningAirplane({
  reservations,
  currentDay,
  onSelectReservation
}: Readonly<PlanningAirplaneProps>) {
  const airplanes = Array.from(new Set(reservations.map(r => r.airplane.name)))

  const getReservationsForDay = (airplane: Reservation['airplane']['name']) => {
    return reservations.filter(
      r => r.airplane.name === airplane && isSameDay(r.startDate, currentDay)
    )
  }

  const timeToX = (time: Date) => {
    const minutesSinceMidnight = time.getHours() * 60 + time.getMinutes()
    return (minutesSinceMidnight / (24 * 60)) * 100
  }

  return (
    <div className="space-y-4 hidden sm:block">
      {airplanes.map(airplane => (
        <div key={airplane} className="relative h-16 flex">
          <p className="w-32 flex-shrink-0 flex items-center font-medium">{airplane}</p>
          <div className="flex-grow bg-muted rounded-r-md ml-2">
            <div className="relative h-full">
              <div className="absolute inset-0 flex">
                {[0, 3, 6, 9, 12, 15, 18, 21].map(hour => (
                  <div key={hour} className="flex-1 border-l border-gray-300 first:border-l-0">
                    <div className="absolute top-0 -ml-3 mt-1 text-xs text-muted-foreground">
                      {hour > 0 && `${hour.toString().padStart(2, '0')}:00`}
                    </div>
                  </div>
                ))}
              </div>
              {getReservationsForDay(airplane).map(reservation => {
                const startX = timeToX(reservation.startDate)
                const endX = timeToX(addMinutes(reservation.startDate, reservation.duration))
                const width = endX - startX

                return (
                  <div
                    key={reservation.id}
                    className="absolute top-0 bottom-0 bg-blue-500 text-white text-xs flex items-center justify-center overflow-hidden rounded-md cursor-pointer"
                    style={{
                      left: `${startX}%`,
                      width: `${width}%`
                    }}
                    onClick={() => onSelectReservation(reservation)}
                  >
                    <span className="px-1 truncate">
                      {/* {reservation.user?.name || 'Réservé'} - {reservation.instructor.name} */}
                      Jack - Daniel
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
