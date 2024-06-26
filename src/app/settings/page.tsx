"use client";

import { PhoneCall } from "lucide-react";
import Image from "next/image";
import type { UserResource } from "@clerk/types";

import Dashboard from "@/components/Dashboard";
import { AuthGuard } from "@/components/AuthGuard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";

function Settings({ user }: Readonly<{ user: UserResource }>) {
  return (
    <Dashboard
      actualState="settings"
      headerOptions={{
        title: "Tableau de bord",
      }}
    >
      <h1 className="text-3xl font-semibold mb-6 mt-2">Compte</h1>
      <Card className="bg-gradient-to-br from-sky-200 from-0% to-white to-55%">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <Image src={user.hasImage ? user.imageUrl : "/placeholder.svg"} alt="avatar" width={75} height={75} />
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
              <p>{""}</p>
            </div>
            <div>
              <p>Lieu de naissance</p>
              <p>{""}</p>
            </div>
            <div>
              <p>Nationnalité</p>
              <p>{""}</p>
            </div>
            <div>
              <p>Adresse</p>
              <p>{""}</p>
            </div>
            <div>
              <p>Ville</p>
              <p>{""}</p>
            </div>
            <div>
              <p>Pays</p>
              <p>{""}</p>
            </div>
            <div>
              <p>Code postal</p>
              <p>{""}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="my-8">
        <CardHeader>
          <CardTitle className="flex gap-2">
            <PhoneCall />
            Personnes à contacter en cas d&apos;urgence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Nom</TableCell>
                <TableCell>Prénom</TableCell>
                <TableCell>Titre</TableCell>
                <TableCell>n°tel</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Mich</TableCell>
                <TableCell>La</TableCell>
                <TableCell>PPL</TableCell>
                <TableCell>099999999</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Dashboard>
  );
}

export default function AuthSettings() {
  return <AuthGuard render={Settings} />;
}
