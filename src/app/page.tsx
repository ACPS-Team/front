'use client'

import {
  Book,
  File,
  HelpCircle,
  LucideMessageCircleWarning,
  PlaneTakeoff,
  Video
} from 'lucide-react'
import Link from 'next/link'

import { AuthGuard } from '@/components/AuthGuard'
import Dashboard from '@/components/Dashboard'
import { TableCard } from '@/components/design/TableCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TableCell, TableRow } from '@/components/ui/table'

function Home({ user }: Readonly<{ user: { id: string; firstName: string } }>) {
  const solde = 300

  return (
    <Dashboard
      actualState="dashboard"
      headerOptions={{
        title: 'Tableau de bord'
      }}
    >
      <h1 className="text-3xl font-semibold mb-6 mt-2">Bienvenue, {user.firstName}</h1>
      <div className="flex w-[100%] justify-between">
        <div className="flex flex-col gap-8 sm:grid sm:grid-cols-2 w-full lg:w-[70%]">
          <Card
            className={`bg-gradient-to-br from-${solde >= 0 ? 'sky' : 'red'}-200 from-0% to-white to-85%`}
          >
            <CardHeader>
              <CardTitle>Solde</CardTitle>
              <CardDescription>Solde de votre compte</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-3xl font-semibold">{solde} €</p>
              {/* <p>Derniers paiement: {new Date().toLocaleDateString()}</p> */}
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-slate-200 from-0% to-white to-85%">
            <CardHeader>
              <CardTitle className="flex gap-2">
                <LucideMessageCircleWarning />
                Actualité
              </CardTitle>
              <CardDescription>Dernier message technique</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Attention l&apos;avion 3102 ne décollera pas</p>
            </CardContent>
          </Card>
          <TableCard
            icon={<PlaneTakeoff />}
            title="Mes vols"
            cardStyle="col-span-2 my-0"
            headers={['Machine', 'Pilote', 'Instructeur', 'Temps est.', 'Départ', 'Arrivé']}
            rows={
              <TableRow>
                <TableCell>FS-1231</TableCell>
                <TableCell>Moi</TableCell>
                <TableCell>Lui</TableCell>
                <TableCell>1h</TableCell>
                <TableCell>Paris</TableCell>
                <TableCell>Lyon</TableCell>
              </TableRow>
            }
          />
          <TableCard
            icon={<PlaneTakeoff />}
            title="Les vols en cours"
            cardStyle="col-span-2 my-0"
            headers={['Machine', 'Pilote', 'Instructeur', 'Temps est.', 'Retard']}
            rows={
              <TableRow>
                <TableCell>FS-1231</TableCell>
                <TableCell>Moi</TableCell>
                <TableCell>Lui</TableCell>
                <TableCell>1h</TableCell>
                <TableCell>0m</TableCell>
              </TableRow>
            }
          />
          <TableCard
            icon={<PlaneTakeoff />}
            title="Les vols d'aujourd'hui"
            cardStyle="col-span-2 my-0"
            headers={['Machine', 'Pilote', 'Instructeur', 'Temps est.', 'Retard']}
            rows={
              <TableRow>
                <TableCell>FS-1231</TableCell>
                <TableCell>Moi</TableCell>
                <TableCell>Lui</TableCell>
                <TableCell>1h</TableCell>
                <TableCell>0m</TableCell>
              </TableRow>
            }
          />
        </div>
        <div className="hidden flex-col w-[25%] gap-4 lg:flex">
          <Card className="bg-secondary">
            <CardHeader>
              <CardTitle>Quiz disponible</CardTitle>
            </CardHeader>
            <CardContent>
              <Button>Faire le quiz</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Ressources</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-col gap-2">
                <li>
                  <Link href="/admin/resources" className="flex gap-2 items-center text-sky-700">
                    <File size={16} />
                    Guide des bonnes pratiques
                  </Link>
                </li>
                <li>
                  <Link href="/admin/resources" className="flex gap-2 items-center text-sky-700">
                    <Video size={16} />
                    Tutoriels vidéos
                  </Link>
                </li>
                <li>
                  <Link href="/admin/resources" className="flex gap-2 items-center text-sky-700">
                    <Book size={16} />
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/admin/resources" className="flex gap-2 items-center text-sky-700">
                    <HelpCircle size={16} /> Centre d&apos;aide
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Dashboard>
  )
}

export default function AuthHome() {
  return <AuthGuard render={Home} />
}
