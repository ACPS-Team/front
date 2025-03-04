import { addMinutes, format } from "date-fns";
import { AlertTriangle, Badge, Clock, Phone, Plane, User } from "lucide-react";
import { fr } from "date-fns/locale";

import type { Reservation } from "@/__generated__/graphql";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DialogReservationProps {
  reservation: Reservation;
  onClose: () => void;
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
              <span>
                Pilote: {reservation.user?.firstName} {reservation.user?.lastName.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-muted-foreground" />
              <span>Instructeur: {reservation.instructor?.firstName} {reservation.instructor?.lastName.toUpperCase()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span>Date: {format(new Date(reservation.startDate), "EEEE d MMMM yyyy", { locale: fr })}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span>
                Horaire: {format(reservation.startDate, "HH:mm")} -{" "}
                {format(addMinutes(reservation.startDate, reservation.duration), "HH:mm")}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <span>Téléphone: xxx</span>
            </div>
            <div className="flex items-center space-x-2">
              <Plane className="h-5 w-5 text-muted-foreground" />
              <span>Avion: {reservation.airplane.name}</span>
            </div>

            <div className="border-t pt-4 mt-2">
              <div className="font-semibold mb-2">Commentaire:</div>
              <div className="bg-gray-50 p-3 rounded-md min-h-[80px] text-sm">
                {/* {reservation.comment || "Aucun commentaire"} */}
                Aucun commentaire
              </div>
            </div>
          </div>
        )}
        <DialogFooter>
          <Button onClick={onClose}>Fermer</Button>
          <Button variant="destructive">
            <AlertTriangle size={16} />
            URGENCE
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
