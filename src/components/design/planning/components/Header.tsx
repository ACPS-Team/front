import { format } from 'date-fns'

interface HeaderProps {
  currentMonth: Date
  prevMonth: () => void
  nextMonth: () => void
}

export function PlanningHeader({ currentMonth, prevMonth, nextMonth }: Readonly<HeaderProps>) {
  return (
    <div className="flex justify-between items-center mb-4">
      <button onClick={prevMonth} className="text-xl font-semibold">
        &lt;
      </button>
      <h2 className="text-2xl font-bold">{format(currentMonth, 'MMMM yyyy')}</h2>
      <button onClick={nextMonth} className="text-xl font-semibold">
        &gt;
      </button>
    </div>
  )
}
