import { addMinutes, format } from 'date-fns'
import { Clock, Plane, User } from 'lucide-react'

import type { Reservation } from '@/__generated__/graphql'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

interface DialogReservationProps {
  reservation: Reservation
  onClose: () => void
}

export function DialogReservation({ reservation, onClose }: Readonly<DialogReservationProps>) {
  return (
    <Dialog open={!!reservation} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Détails de la Réservation</DialogTitle>
          <DialogDescription>Informations sur la réservation sélectionnée</DialogDescription>
        </DialogHeader>
        {reservation && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">
                {/* {reservation.user.name || 'Pas de pilote assigné'} */}
                Jack
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-muted-foreground" />
              {/* <span>Instructeur: {reservation.instructor.name}</span> */}
              <span>Instructeur: Daniel</span>
            </div>
            <div className="flex items-center space-x-2">
              <Plane className="h-5 w-5 text-muted-foreground" />
              <span>Avion: {reservation.airplane.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span>
                Début: {format(reservation.startDate, 'HH:mm')} - Fin:{' '}
                {format(addMinutes(reservation.startDate, reservation.duration), 'HH:mm')}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span>Durée: {reservation.duration} minutes</span>
            </div>
          </div>
        )}
        <DialogFooter>
          <Button onClick={onClose}>Fermer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
