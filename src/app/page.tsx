"use client";

import type { UserResource } from "@clerk/types";

import Dashboard from "@/components/Dashboard";
import { AuthGuard } from "@/components/AuthGuard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Book, File, HelpCircle, LucideMessageCircleWarning, PlaneTakeoff, Video } from "lucide-react";
import { Table, TableBody, TableCaption, TableCell, TableHeader, TableRow } from "@/components/ui/table";

function Home({ user }: Readonly<{ user: UserResource }>) {
  return (
    <Dashboard
      actualState="dashboard"
      headerOptions={{
        title: "Tableau de bord",
      }}
    >
      <h1 className="text-3xl font-semibold mb-6 mt-2">Bienvenue, {user.firstName}</h1>
      <div className="flex w-[100%] justify-between">
        <div className="grid grid-cols-2 gap-8 w-[100%] lg:w-[70%]">
          <Card className="bg-gradient-to-br from-sky-200 from-0% to-white to-85%">
            <CardHeader>
              <CardTitle>Solde</CardTitle>
              <CardDescription>Solde de votre compte</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-3xl font-semibold">300 €</p>
              {/* <p>Derniers paiement: {new Date().toLocaleDateString()}</p> */}
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-red-200 from-0% to-white to-85%">
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
          <div className="col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex gap-2">
                  <PlaneTakeoff />
                  Mes vols
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableCaption>
                    Pour en voir d&apos;avantages:{" "}
                    <Link href="#" className="underline">
                      ici
                    </Link>
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableCell>Machine</TableCell>
                      <TableCell>Pilote</TableCell>
                      <TableCell>Instructeur</TableCell>
                      <TableCell>Temps est.</TableCell>
                      <TableCell>Départ</TableCell>
                      <TableCell>Arrivé</TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>FS-1231</TableCell>
                      <TableCell>Moi</TableCell>
                      <TableCell>Lui</TableCell>
                      <TableCell>1h</TableCell>
                      <TableCell>Paris</TableCell>
                      <TableCell>Lyon</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
          <div className="col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex gap-2">
                  <PlaneTakeoff />
                  Les vols en cours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableCell>Machine</TableCell>
                      <TableCell>Pilote</TableCell>
                      <TableCell>Instructeur</TableCell>
                      <TableCell>Temps est.</TableCell>
                      <TableCell>Retard</TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>FS-1231</TableCell>
                      <TableCell>Moi</TableCell>
                      <TableCell>Lui</TableCell>
                      <TableCell>1h</TableCell>
                      <TableCell>0m</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
          <div className="col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex gap-2">
                  <PlaneTakeoff />
                  Les vols d&apos;aujourd&apos;hui
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableCell>Machine</TableCell>
                      <TableCell>Pilote</TableCell>
                      <TableCell>Instructeur</TableCell>
                      <TableCell>Temps est.</TableCell>
                      <TableCell>Retard</TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>FS-1231</TableCell>
                      <TableCell>Moi</TableCell>
                      <TableCell>Lui</TableCell>
                      <TableCell>1h</TableCell>
                      <TableCell>0m</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
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
  );
}

export default function AuthHome() {
  return <AuthGuard render={Home} />;
}
