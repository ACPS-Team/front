"use client";

import { addDays, format, subDays } from "date-fns";
import { fr } from "date-fns/locale";
import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";


// Importer uniquement les composants qui existent
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthGuard } from "@/components/AuthGuard";
import Dashboard from "@/components/Dashboard";
import { DialogReservation } from "@/components/design/dialog/Reservation";
import { DialogNewReservation } from "@/components/design/dialog/NewReservation";
import { DayView } from "@/components/design/planning/DayView";
import { PlanningAirplane } from "@/components/design/planning/Airplane";
import type { Reservation } from "@/__generated__/graphql";  

function Planning() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null)
  const [isDialogNewReservationOpen, setIsDialogNewReservationOpen] = useState(false)

  const [timeFilter, setTimeFilter] = useState("day");

  const [airplanes, setAirplanes] = useState<string[]>(["Cessna 172", "Piper PA-28", "Beechcraft Bonanza"])
  const [reservations, setReservations] = useState<Reservation[]>([
    {
      id: "1",
      startDate: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 9, 0, 0),
      duration: 120, // 2 heures en minutes
      user: { firstName: "John", lastName: "Doe" },
      instructor: { firstName: "Jane", lastName: "Doe" },
      airplane: { name: "Cessna 172" },
      comment: "Vol d'entraînement",
    },
    {
      id: "2",
      startDate: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 13, 30, 0),
      duration: 100, // 1h40 en minutes
      user: { firstName: "Marie", lastName: "Martin" },
      instructor: { firstName: "John", lastName: "Doe" },
      airplane: { name: "Piper PA-28" },
      comment: "Vol touristique",
    },
    {
      id: "3",
      startDate: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 16, 0, 0),
      duration: 120, // 2h en minutes
      user: { firstName: "Pierre", lastName: "Dubois" },
      instructor: { firstName: "Marie", lastName: "Martin" },
      airplane: { name: "Beechcraft Bonanza" },
      comment: "Navigation",
    },
    {
      id: "4",
      startDate: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 12, 0, 0),
      duration: 120, // 2h en minutes
      user: { firstName: "Pierre", lastName: "Dubois" },
      instructor: { firstName: "Marie", lastName: "Martin" },
      airplane: { name: "Beechcraft Bonanza" },
      comment: "Navigation",
    },
    {
      id: "5",
      startDate: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() + 1, 12, 0, 0),
      duration: 120, // 2h en minutes
      user: { firstName: "Pierre", lastName: "Dubois" },
      instructor: { firstName: "Marie", lastName: "Martin" },
      airplane: { name: "Beechcraft Bonanza" },
      comment: "Navigation",
    },
  ]);

  // Fonction pour calculer le nombre de vols selon le filtre temporel
  const getFilteredFlightsCount = () => {
    if (!reservations.length) return 0;

    const today = new Date(selectedDate);
    today.setHours(0, 0, 0, 0);

    switch (timeFilter) {
      case "day":
        return reservations.filter((res) => {
          const resDate = new Date(res.startDate);
          return (
            resDate.getDate() === today.getDate() &&
            resDate.getMonth() === today.getMonth() &&
            resDate.getFullYear() === today.getFullYear()
          );
        }).length;
      case "week":
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1)); // Lundi de la semaine
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // Dimanche de la semaine

        return reservations.filter((res) => {
          const resDate = new Date(res.startDate);
          return resDate >= startOfWeek && resDate <= endOfWeek;
        }).length;
      case "month":
        return reservations.filter((res) => {
          const resDate = new Date(res.startDate);
          return resDate.getMonth() === today.getMonth() && resDate.getFullYear() === today.getFullYear();
        }).length;
      case "semester":
        const currentMonth = today.getMonth();
        const startMonth = currentMonth < 6 ? 0 : 6; // Premier semestre: 0-5, Deuxième: 6-11
        const endMonth = currentMonth < 6 ? 5 : 11;

        return reservations.filter((res) => {
          const resDate = new Date(res.startDate);
          return (
            resDate.getMonth() >= startMonth &&
            resDate.getMonth() <= endMonth &&
            resDate.getFullYear() === today.getFullYear()
          );
        }).length;
      case "year":
        return reservations.filter((res) => {
          const resDate = new Date(res.startDate);
          return resDate.getFullYear() === today.getFullYear();
        }).length;
      default:
        return reservations.length;
    }
  };

  const filteredReservations = useMemo(() => reservations.filter((reservation) => {
    const reservationDate = new Date(reservation.startDate);
    const today = new Date(selectedDate);
    return (
      reservationDate.getDate() === today.getDate() &&
      reservationDate.getMonth() === today.getMonth() &&
      reservationDate.getFullYear() === today.getFullYear()
    );
  }), [reservations, selectedDate]);

  return (
    <Dashboard
      actualState="planning"
      headerOptions={{
        title: "Planning",
      }}
    >
      <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Envie d'un vol ?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-4">
              <p className="text-sm text-gray-600">Réservez dès maintenant votre prochain vol</p>
              <Button onClick={() => setIsDialogNewReservationOpen(true)} className="w-full bg-gray-900 hover:bg-gray-800">Réserver</Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Nombre de vols</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <p className="text-4xl font-bold mb-4">{getFilteredFlightsCount()}</p>
              <div className="flex gap-1 justify-center">
                <Button
                  variant={timeFilter === "day" ? "default" : "outline"}
                  size="sm"
                  className={timeFilter === "day" ? "bg-gray-100 text-gray-900 hover:bg-gray-200 border" : ""}
                  onClick={() => setTimeFilter("day")}
                >
                  Jour
                </Button>
                <Button
                  variant={timeFilter === "week" ? "default" : "outline"}
                  size="sm"
                  className={timeFilter === "week" ? "bg-gray-100 text-gray-900 hover:bg-gray-200 border" : ""}
                  onClick={() => setTimeFilter("week")}
                >
                  Semaine
                </Button>
                <Button
                  variant={timeFilter === "month" ? "default" : "outline"}
                  size="sm"
                  className={timeFilter === "month" ? "bg-gray-100 text-gray-900 hover:bg-gray-200 border" : ""}
                  onClick={() => setTimeFilter("month")}
                >
                  Mois
                </Button>
                <Button
                  variant={timeFilter === "semester" ? "default" : "outline"}
                  size="sm"
                  className={timeFilter === "semester" ? "bg-gray-100 text-gray-900 hover:bg-gray-200 border" : ""}
                  onClick={() => setTimeFilter("semester")}
                >
                  Semestre
                </Button>
                <Button
                  variant={timeFilter === "year" ? "default" : "outline"}
                  size="sm"
                  className={timeFilter === "year" ? "bg-gray-900 text-white hover:bg-gray-800" : ""}
                  onClick={() => setTimeFilter("year")}
                >
                  Année
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>


      <div className="flex justify-between items-center mb-16 mt-12">
        <Button variant="ghost" size="icon" onClick={() => setSelectedDate(subDays(selectedDate, 1))} aria-label="Jour précédent">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-2xl font-bold">{format(selectedDate, 'EEEE d MMMM yyyy', { locale: fr })}</h2>
        <Button variant="ghost" size="icon" onClick={() => setSelectedDate(addDays(selectedDate, 1))} aria-label="Jour suivant">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      
      <PlanningAirplane
        airplanes={airplanes}
        reservations={filteredReservations as unknown as Reservation[]}
        currentDay={selectedDate}
        onSelectReservation={(reservation) => setSelectedReservation(reservation)}
        onNewReservation={() => setIsDialogNewReservationOpen(true)}
      />

      <div className="mt-16" />

      <DayView
        selectedDate={selectedDate}
        reservations={filteredReservations as unknown as Reservation[]}
        onSelectReservation={(reservation) => setSelectedReservation(reservation)}
      />

      <DialogReservation
        reservation={selectedReservation as unknown as Reservation}
        onClose={() => setSelectedReservation(null)}
      />

      <DialogNewReservation
        airplanes={airplanes}
        isOpen={isDialogNewReservationOpen}
        onClose={() => setIsDialogNewReservationOpen(false)}
      />
    </Dashboard>
  );
}

export default function AuthPlanning() {
  return <AuthGuard render={Planning} />;
}
