import { addMinutes, isSameDay } from 'date-fns'

import type { Reservation } from '@/__generated__/graphql'

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
    const startMinutes = 7 * 60 // 07:00
    const endMinutes = 23 * 60 // 23:00
    const totalMinutes = endMinutes - startMinutes
    
    // Clamp the time to our range
    const clampedMinutes = Math.max(startMinutes, Math.min(endMinutes, minutesSinceMidnight))
    
    // Calculate percentage within our range
    return ((clampedMinutes - startMinutes) / totalMinutes) * 100
  }

  return (
    <div className="space-y-4 hidden sm:block">
      {airplanes.map(airplane => (
        <div key={airplane} className="relative h-16 flex">
          <p className="w-32 flex-shrink-0 flex items-center font-medium">{airplane}</p>
          <div className="flex-grow bg-muted rounded-r-md ml-2">
            <div className="relative h-full">
              <div className="absolute inset-0 flex">
                {[7, 9, 11, 13, 15, 17, 19, 21, 23].map(hour => (
                  <div key={hour} className="flex-1 border-l border-gray-300 first:border-l-0">
                    <div className="absolute top-0 -ml-3 mt-1 text-xs text-muted-foreground">
                      {`${hour.toString().padStart(2, '0')}:00`}
                    </div>
                  </div>
                ))}
              </div>
              {getReservationsForDay(airplane).map(reservation => {
                const startX = timeToX(reservation.startDate)
                const endX = timeToX(addMinutes(reservation.startDate, reservation.duration))
                const width = endX - startX

                return (
                  <button
                    key={reservation.id}
                    className="absolute top-0 bottom-0 bg-blue-500 text-white text-xs flex items-center justify-center overflow-hidden rounded-md cursor-pointer border-0"
                    style={{
                      left: `${startX}%`,
                      width: `${width}%`
                    }}
                    onClick={() => onSelectReservation(reservation)}
                    aria-label={`Réservation ${airplane}`}
                    type="button"
                  >
                    <span className="px-1 truncate">
                      {/* {reservation.user?.name || 'Réservé'} - {reservation.instructor.name} */}
                      Jack - Daniel
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
