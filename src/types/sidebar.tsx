import {
  Book,
  Calendar,
  CalendarClock,
  Euro,
  FileQuestion,
  Files,
  Home,
  PlaneTakeoff,
  Users
} from 'lucide-react'

export type actualState =
  | 'dashboard'
  | 'organisation'
  | 'settings'
  | 'lessons'
  | 'documents'
  | 'quizzes'
  | 'planning'
  | 'schedule'
  | 'flights'
  | 'solde'

export const states = [
  {
    id: 0,
    items: [
      {
        id: 'dashboard',
        link: '/',
        name: 'Tableau de bord',
        icon: <Home className="h-4 w-4" />
      },
      {
        id: 'lessons',
        link: '/lessons',
        name: 'Cours',
        icon: <Book className="h-4 w-4" />
      },
      {
        id: 'planning',
        link: '/planning',
        name: 'Planning',
        icon: <Calendar className="h-4 w-4" />
      },

      {
        id: 'schedule',
        link: '/schedule',
        name: 'Réservations',
        icon: <CalendarClock className="h-4 w-4" />
      },

      {
        id: 'flights',
        link: '/flights',
        name: 'Mes vols',
        icon: <PlaneTakeoff className="h-4 w-4" />
      },
      {
        id: 'quizzes',
        link: '/quizzes',
        name: 'Quizzes',
        icon: <FileQuestion className="h-4 w-4" />
      }
    ]
  },
  {
    id: 1,
    items: [
      {
        id: 'organisation',
        link: 'organisation',
        name: 'Trombinoscope',
        icon: <Users className="h-4 w-4" />
      },
      {
        id: 'documents',
        link: 'documents',
        name: 'Documents',
        icon: <Files className="h-4 w-4" />
      }
    ]
  },
  {
    id: 2,
    items: [
      {
        id: 'solde',
        link: '#',
        name: 'Solde',
        icon: <Euro className="h-4 w-4" />
      }
    ]
  }
]
