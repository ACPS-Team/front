import { formatDate } from '../format/formatDate'

interface Event {
  title: string
  description: string
  startDate: Date
  endDate: Date
  location: string
}

export const ExportToCalendar = (event: Event) => {
  const calendarContent = `
    BEGIN:VCALENDAR
    VERSION:2.0
    PRODID:-//YourApp//EN
    BEGIN:VEVENT
    UID:${new Date().getTime()}@yourapp.com
    DTSTAMP:${formatDate(new Date())}
    DTSTART:${formatDate(event.startDate)}
    DTEND:${formatDate(event.endDate)}
    SUMMARY:${event.title}
    DESCRIPTION:${event.description}
    LOCATION:${event.location}
    END:VEVENT
    END:VCALENDAR
        `.trim()

  const blob = new Blob([calendarContent], { type: 'text/calendar' })
  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(blob)
  link.download = 'event.ics'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
