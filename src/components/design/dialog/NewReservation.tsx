import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

interface DialogNewReservationProps {
  airplanes: string[]
  isOpen: boolean
  onClose: () => void
}

export function DialogNewReservation({ airplanes, isOpen, onClose }: Readonly<DialogNewReservationProps>) {
  const [newReservation, setNewReservation] = useState({
    instructorId: '',
    airplaneId: '',
    flightType: '',
    flightDuration: ''
  })

  const handleNewReservationChange = (key: string, value: string) => {
    setNewReservation(prevState => ({ ...prevState, [key]: value }))
  }

  const handleSubmit = () => {
    console.log(newReservation)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nouvelle Réservation</DialogTitle>
          <DialogDescription>
            Remplissez les détails pour créer une nouvelle réservation
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input id="date" type="date" min={new Date().toISOString().split('T')[0]} />
          </div>
          <div className="space-y-2 flex gap-4 items-start">
            <div className="flex-grow">
              <Label htmlFor="start">Début</Label>
              <Input id="start" type="time" />
            </div>
            <div className="flex-grow" style={{ margin: 0 }}>
              <Label htmlFor="duration">Fin estimée</Label>
              <Input id="end" type="time" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="flightDuration">Durée de vol estimée</Label>
            <Input id="flightDuration" type="time" defaultValue={'01:00'} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="flightType">Type de vol</Label>
            <Select onValueChange={value => handleNewReservationChange('flightType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un type de vol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={'DC'}>Vol en DC avec instructeur</SelectItem>
                <SelectItem value={'SOLO'}>Vol solo supervisé</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="instructor">Instructeur</Label>
            <Select onValueChange={value => handleNewReservationChange('instructorId', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un instructeur" />
              </SelectTrigger>
              <SelectContent>
                {/* {instructors.map(instructor => (
                  <SelectItem key={instructor.id} value={instructor.id}>
                    {instructor.name}
                  </SelectItem>
                ))} */}
                <SelectItem value={'SALUT'}>SALUT</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="airplane">Avion</Label>
            <Select onValueChange={value => handleNewReservationChange('airplaneId', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un avion" />
              </SelectTrigger>
              <SelectContent>
                {airplanes.map(airplane => (
                  <SelectItem key={airplane} value={airplane}>
                    {airplane}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Annuler</Button>
          <Button onClick={handleSubmit}>Créer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
