'use client'

import { addDays, format, subDays } from 'date-fns'
import { fr } from 'date-fns/locale'
import { useState, useEffect } from 'react'
import { AlertTriangle, ChevronLeft, ChevronRight } from 'lucide-react'

// Définir le type Reservation directement ici pour éviter les problèmes d'importation
interface Reservation {
  id: string;
  startDate: Date;
  endDate: Date;
  duration: number;
  pilotName: string;
  pilotPhone: string;
  airplane: string | { name: string };
  status: "confirmed" | "pending";
  comment?: string;
}

// Importer uniquement les composants qui existent
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

function Planning() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null)
  const [timeFilter, setTimeFilter] = useState("day") // Filtre temporel pour les statistiques

  // Heures à afficher dans le planning
  const displayHours = ["07:00", "09:00", "11:00", "13:00", "15:00", "17:00", "19:00", "21:00", "23:00"];
  
  // Liste des avions
  const airplanes = ["Cessna 172", "Piper PA-28", "Beechcraft Bonanza"];
  
  // Données d'exemple pour simuler des réservations
  const exampleReservations: Reservation[] = [
    {
      id: "1",
      startDate: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 9, 0, 0),
      endDate: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 11, 0, 0),
      duration: 120, // 2 heures en minutes
      pilotName: "Jean Dupont",
      pilotPhone: "0612345678",
      airplane: { name: "Cessna 172" }, 
      status: "confirmed",
      comment: "Vol d'entraînement"
    },
    {
      id: "2",
      startDate: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 13, 30, 0),
      endDate: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 15, 10, 0),
      duration: 100, // 1h40 en minutes
      pilotName: "Marie Martin",
      pilotPhone: "0687654321",
      airplane: { name: "Piper PA-28" }, 
      status: "confirmed",
      comment: "Vol touristique"
    },
    {
      id: "3",
      startDate: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 16, 0, 0),
      endDate: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 18, 0, 0),
      duration: 120, // 2h en minutes
      pilotName: "Pierre Dubois",
      pilotPhone: "0698765432",
      airplane: { name: "Beechcraft Bonanza" }, 
      status: "confirmed",
      comment: "Navigation"
    }
  ]

  // Utiliser les données d'exemple au chargement initial
  useEffect(() => {
    // Simuler un chargement
    setTimeout(() => {
      setReservations(exampleReservations)
      setLoading(false)
    }, 1000)
  }, [selectedDate]) // Mettre à jour les réservations quand la date change

  // Fonction pour calculer le nombre de vols selon le filtre temporel
  const getFilteredFlightsCount = () => {
    if (!reservations.length) return 0
    
    const today = new Date(selectedDate)
    today.setHours(0, 0, 0, 0)
    
    switch (timeFilter) {
      case "day":
        return reservations.filter(res => {
          const resDate = new Date(res.startDate)
          return resDate.getDate() === today.getDate() && 
                 resDate.getMonth() === today.getMonth() && 
                 resDate.getFullYear() === today.getFullYear()
        }).length
      case "week":
        const startOfWeek = new Date(today)
        startOfWeek.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1)) // Lundi de la semaine
        const endOfWeek = new Date(startOfWeek)
        endOfWeek.setDate(startOfWeek.getDate() + 6) // Dimanche de la semaine
        
        return reservations.filter(res => {
          const resDate = new Date(res.startDate)
          return resDate >= startOfWeek && resDate <= endOfWeek
        }).length
      case "month":
        return reservations.filter(res => {
          const resDate = new Date(res.startDate)
          return resDate.getMonth() === today.getMonth() && 
                 resDate.getFullYear() === today.getFullYear()
        }).length
      case "semester":
        const currentMonth = today.getMonth()
        const startMonth = currentMonth < 6 ? 0 : 6 // Premier semestre: 0-5, Deuxième: 6-11
        const endMonth = currentMonth < 6 ? 5 : 11
        
        return reservations.filter(res => {
          const resDate = new Date(res.startDate)
          return resDate.getMonth() >= startMonth && 
                 resDate.getMonth() <= endMonth && 
                 resDate.getFullYear() === today.getFullYear()
        }).length
      case "year":
        return reservations.filter(res => {
          const resDate = new Date(res.startDate)
          return resDate.getFullYear() === today.getFullYear()
        }).length
      default:
        return reservations.length
    }
  }

  const nextDay = () => {
    setSelectedDate(addDays(selectedDate, 1))
  }

  const prevDay = () => {
    setSelectedDate(subDays(selectedDate, 1))
  }

  const handleSelectReservation = (reservation: Reservation) => {
    setSelectedReservation(reservation)
  }

  // Fonction pour obtenir le nom de l'avion
  const getAirplaneName = (airplane: string | { name: string }) => {
    if (typeof airplane === 'string') {
      return airplane
    } else if (airplane && typeof airplane === 'object' && 'name' in airplane) {
      return airplane.name
    } else {
      return "Avion non spécifié"
    }
  }

  // Fonction pour gérer le clic sur le bouton d'urgence
  const handleEmergency = () => {
    alert("Redirection vers les contacts d'urgence")
    setSelectedReservation(null)
  }

  // Filtrer les réservations pour le jour sélectionné
  const filteredReservations = reservations.filter(res => {
    const resDate = new Date(res.startDate)
    const today = new Date(selectedDate)
    return resDate.getDate() === today.getDate() && 
           resDate.getMonth() === today.getMonth() && 
           resDate.getFullYear() === today.getFullYear()
  })

  // Fonction pour calculer la position et la largeur d'une réservation
  const calculateReservationPosition = (reservation: Reservation) => {
    const startHour = new Date(reservation.startDate).getHours();
    const startMinutes = new Date(reservation.startDate).getMinutes();
    const endHour = new Date(reservation.endDate).getHours();
    const endMinutes = new Date(reservation.endDate).getMinutes();
    
    // Convertir en minutes depuis minuit
    const startMinutesSinceMidnight = startHour * 60 + startMinutes;
    const endMinutesSinceMidnight = endHour * 60 + endMinutes;
    
    // Plage totale en minutes (de 7h à 23h)
    const totalMinutes = (23 - 7) * 60;
    const startOffset = startMinutesSinceMidnight - 7 * 60;
    
    // Calculer les pourcentages
    const startPercent = (startOffset / totalMinutes) * 100;
    const widthPercent = ((endMinutesSinceMidnight - startMinutesSinceMidnight) / totalMinutes) * 100;
    
    return {
      startPercent,
      widthPercent
    };
  }

  return (
    <div className="w-full py-8 px-6">
      <div className="w-[95%] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card className="border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Envie d'un vol ?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <p className="text-sm text-gray-600">Réservez dès maintenant votre prochain vol</p>
                <Button className="w-full bg-gray-900 hover:bg-gray-800">
                  Réserver
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Nombre de vols</CardTitle>
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

        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" size="icon" onClick={prevDay} aria-label="Jour précédent">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-medium">
            {format(selectedDate, 'EEEE d MMMM yyyy', { locale: fr })}
          </h2>
          <Button variant="ghost" size="icon" onClick={nextDay} aria-label="Jour suivant">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p>Chargement du planning...</p>
          </div>
        ) : (
          <div className="w-full space-y-3">
            {airplanes.map((airplane) => {
              // Vérifier si l'avion a des réservations pour ce jour
              const hasReservations = filteredReservations.some(
                res => getAirplaneName(res.airplane) === airplane
              );
              
              return (
                <div key={airplane} className="flex items-center mb-3">
                  {/* Nom de l'avion */}
                  <div className="w-36 pr-4">
                    <span className="text-sm font-medium">{airplane}</span>
                  </div>
                  
                  {/* Grille horaire */}
                  <div className="flex-1 relative">
                    {/* Fond de la grille */}
                    <div className="h-14 bg-gray-100 rounded-md relative flex">
                      {/* Heures */}
                      {displayHours.map((hour, index) => (
                        <div 
                          key={index} 
                          className="absolute text-xs text-gray-500"
                          style={{ 
                            left: `${(index / (displayHours.length - 1)) * 100}%`,
                            transform: 'translateX(-50%)',
                            top: '3px'
                          }}
                        >
                          {hour}
                        </div>
                      ))}
                      
                      {/* Lignes verticales pour les heures */}
                      {displayHours.map((_, index) => (
                        <div
                          key={index}
                          className="absolute top-0 bottom-0 border-l border-gray-200"
                          style={{ 
                            left: `${(index / (displayHours.length - 1)) * 100}%`,
                          }}
                        />
                      ))}
                      
                      {/* Réservations */}
                      {filteredReservations
                        .filter(res => getAirplaneName(res.airplane) === airplane)
                        .map(reservation => {
                          const { startPercent, widthPercent } = calculateReservationPosition(reservation);
                          
                          return (
                            <div
                              key={reservation.id}
                              className="absolute top-[24px] h-8 bg-blue-500 text-white rounded-md flex items-center justify-center text-xs cursor-pointer"
                              style={{
                                left: `${startPercent}%`,
                                width: `${widthPercent}%`,
                              }}
                              onClick={() => handleSelectReservation(reservation)}
                            >
                              {reservation.pilotName}
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Popup de détails de réservation */}
        {selectedReservation && (
          <Dialog open={!!selectedReservation} onOpenChange={(open) => { if (!open) setSelectedReservation(null) }}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Détails de la réservation</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 items-center gap-2">
                  <div className="font-semibold">Pilote: {selectedReservation.pilotName}</div>
                </div>
                <div className="grid grid-cols-1 items-center gap-2">
                  <div className="font-semibold">Instructeur: Daniel</div>
                </div>
                <div className="grid grid-cols-1 items-center gap-2">
                  <div>Date: {format(new Date(selectedReservation.startDate), "EEEE d MMMM yyyy", { locale: fr })}</div>
                </div>
                <div className="grid grid-cols-1 items-center gap-2">
                  <div>
                    Horaire: {format(new Date(selectedReservation.startDate), "HH:mm")} - 
                    {format(new Date(selectedReservation.endDate), "HH:mm")}
                  </div>
                </div>
                <div className="grid grid-cols-1 items-center gap-2">
                  <div>Téléphone: {selectedReservation.pilotPhone}</div>
                </div>
                <div className="grid grid-cols-1 items-center gap-2">
                  <div>Avion: {getAirplaneName(selectedReservation.airplane)}</div>
                </div>
                <div className="grid grid-cols-1 items-center gap-2">
                  <div>
                    Statut: {selectedReservation.status === "confirmed" ? "Confirmé" : "En attente"}
                  </div>
                </div>
              </div>
              
              {/* Section commentaire en bas de la fenêtre */}
              <div className="border-t pt-4 mt-2">
                <div className="font-semibold mb-2">Commentaire:</div>
                <div className="bg-gray-50 p-3 rounded-md min-h-[80px] text-sm">
                  {selectedReservation.comment || "Aucun commentaire"}
                </div>
              </div>
              
              {/* Bouton d'urgence */}
              <div className="flex justify-end mt-4">
                <Button 
                  variant="destructive" 
                  className="flex items-center gap-2" 
                  onClick={handleEmergency}
                >
                  <AlertTriangle size={16} />
                  URGENCE
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}

export default Planning
