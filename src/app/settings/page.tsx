'use client'

import { PhoneCall, Info } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect } from 'react'

import { AuthGuard } from '@/components/AuthGuard'
import Dashboard from '@/components/Dashboard'
import { TableCard } from '@/components/design/TableCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TableCell, TableRow } from '@/components/ui/table'

function Settings({ user }: Readonly<{ user: {
  firstName: string
  lastName: string
  imageUrl: string
  hasImage: boolean
} }>) {
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [tooltipTimeout, setTooltipTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (tooltipTimeout) {
      clearTimeout(tooltipTimeout);
      setTooltipTimeout(null);
    }
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setShowTooltip(false);
    }, 200); // Delay before hiding the tooltip
    setTooltipTimeout(timeout);
  };

  useEffect(() => {
    const createAirplane = () => {
      const airplane = document.createElement('div');
      airplane.className = 'airplane';
      airplane.style.left = `${Math.random() * 100}%`;
      airplane.style.animationDuration = `${5 + Math.random() * 10}s`;
      document.body.appendChild(airplane);

      airplane.addEventListener('animationend', () => {
        airplane.remove();
      });
    };

    const interval = setInterval(createAirplane, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Dashboard
      actualState="settings"
      headerOptions={{
        title: 'Paramètres'
      }}
    >
      <h1 className="text-3xl font-semibold mb-6 mt-2">Compte</h1>
      <Card className="bg-gradient-to-br from-sky-200 from-0% to-white to-55%">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <Image
                src={user.hasImage ? user.imageUrl : '/placeholder.svg'}
                alt="avatar"
                width={75}
                height={75}
              />
              {user.firstName} {user.lastName}
            </div>
            <div>
              <Button size="sm" variant="outline">
                Modifier son profil
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p>Prénom / Nom</p>
              <p>
                {user.firstName} - {user.lastName}
              </p>
            </div>
            <div>
              <p>Date de naissance</p>
              <p>{''}</p>
            </div>
            <div>
              <p>Lieu de naissance</p>
              <p>{''}</p>
            </div>
            <div>
              <p>Nationnalité</p>
              <p>{''}</p>
            </div>
            <div>
              <p>Adresse</p>
              <p>{''}</p>
            </div>
            <div>
              <p>Ville</p>
              <p>{''}</p>
            </div>
            <div>
              <p>Pays</p>
              <p>{''}</p>
            </div>
            <div>
              <p>Code postal</p>
              <p>{''}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="mt-6 relative">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Contact
            <div
              className="relative inline-block"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Info className="ml-2 cursor-pointer" />
              {showTooltip && (
                <div className="absolute top-0 right-0 bg-white p-2 border rounded shadow-lg z-10 text-xs">
                  <p>Les informations qui vous concernent sont strictement destinées à l'aéro club Paris sud. Conformément à la loi informatique et Libertés du 6 janvier 1978, vous disposez d'un droit d'accès et de rectification aux données vous concernant. Pour l'exercer, vous pouvez nous envoyer un E-mail: amar@aeroclub.fr</p>
                </div>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex items-center">
              <label htmlFor="email" className="mr-2">Email :</label>
              <input type="email" id="email" className="w-1/2 p-2 border rounded" />
            </div>
            <div className="flex items-center">
              <label htmlFor="phone" className="mr-2">Numéro de téléphone :</label>
              <input type="tel" id="phone" className="w-1/2 p-2 border rounded" />
            </div>
            <div>
              <input type="checkbox" id="no-share" />
              <label htmlFor="no-share" className="ml-2">
                Ne souhaite <strong>pas</strong> communiquer cette adresse aux autres membres du club (affichage panneau club, intranet).
              </label>
            </div>
            <div>
              <input type="checkbox" id="admin-only" />
              <label htmlFor="admin-only" className="ml-2">
              Ne souhaite <strong>pas</strong> recevoir les messages généraux du club à cette adresse.
              </label>
            </div>
            <div>
              <p className="text-sm mt-2">Si ces deux cases sont <strong>activées</strong>,<br />seule l'administration du club aura accès à cette adresse.</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <TableCard
        icon={<PhoneCall />}
        title="Personnes à contacter"
        headers={['Nom', 'Prénom', 'Titre', 'n°tel']}
        rows={
          <TableRow>
            <TableCell>Mich</TableCell>
            <TableCell>La</TableCell>
            <TableCell>PPL</TableCell>
            <TableCell>099999999</TableCell>
          </TableRow>
        }
      />
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Visite Médicale</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div>
              <input type="radio" id="no-visit" name="medical-visit" value="no-visit" />
              <label htmlFor="no-visit" className="ml-2">Pas de visite médicale</label>
            </div>
            <div>
              <input type="radio" id="valid-visit" name="medical-visit" value="valid-visit" />
              <label htmlFor="valid-visit" className="ml-2">Visite médicale valable jusqu'au :</label>
              <input type="date" className="ml-2" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Titre aéronautique</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div>
              <input
                type="radio"
                id="student-pilot"
                name="aero-title"
                value="student-pilot"
                onChange={() => setSelectedTitle('student-pilot')}
              />
              <label htmlFor="student-pilot" className="ml-2">Eleve Pilote : (Vous volez en vue de l'obtention d'un titre aéronautique)</label>
            </div>
            <div>
              <input
                type="radio"
                id="bb"
                name="aero-title"
                value="bb"
                onChange={() => setSelectedTitle('bb')}
              />
              <label htmlFor="bb" className="ml-2">BB : Obtenu le :</label>
              {selectedTitle === 'bb' && <input type="date" className="ml-2" />}
            </div>
            <div>
              <input
                type="radio"
                id="ppl"
                name="aero-title"
                value="ppl"
                onChange={() => setSelectedTitle('ppl')}
              />
              <label htmlFor="ppl" className="ml-2">PPL : Qualification SEP valable jusqu'au :</label>
              {selectedTitle === 'ppl' && <input type="date" className="ml-2" />}
            </div>
            <div>
              <input
                type="radio"
                id="lapl"
                name="aero-title"
                value="lapl"
                onChange={() => setSelectedTitle('lapl')}
              />
              <label htmlFor="lapl" className="ml-2">LAPL : Obtenu le :</label>
              {selectedTitle === 'lapl' && <input type="date" className="ml-2" />}
            </div>
            <div>
              <label htmlFor="comments" className="mt-4">Commentaires :</label>
              <textarea id="comments" className="w-full mt-2 p-2 border rounded"></textarea>
            </div>
          </div>
        </CardContent>
      </Card>
    </Dashboard>
  )
}

export default function AuthSettings() {
  return <AuthGuard render={Settings} />
}

