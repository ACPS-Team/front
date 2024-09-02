export function PlanningDays() {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  return (
    <div className="grid grid-cols-7 mb-2">
      {daysOfWeek.map(day => (
        <div key={day} className="text-center font-medium">
          {day}
        </div>
      ))}
    </div>
  )
}
