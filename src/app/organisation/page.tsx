"use client";

import Image from "next/image";
import type { UserResource } from "@clerk/types";

import Dashboard from "@/components/Dashboard";
import { AuthGuard } from "@/components/AuthGuard";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Plane, User, Users } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCallback, useState } from "react";

function Organisation({ user }: Readonly<{ user: UserResource }>) {
  const users = [
    {
      id: 0,
      firstName: "Bernard",
      lastName: "Dupont",
      email: "a@a.a",
      group: "Admin",
    },
    {
      id: 1,
      firstName: "Jane",
      lastName: "Doe",
      email: "a@a.a",
      group: "Admin",
    },
    {
      id: 2,
      firstName: "John",
      lastName: "Kick",
      email: "a@a.a",
      group: "Pilotes",
    },
    {
      id: 3,
      firstName: "Fred",
      lastName: "Pack",
      email: "a@a.a",
      group: "Pilotes",
    },
  ];

  const [selectedGroup, setSelectedGroup] = useState("All");
  const [search, setSearch] = useState("");

  const getButtonLabel = useCallback(() => {
    switch (selectedGroup) {
      case "Admin":
        return "Administrateurs";
      case "Pilotes":
        return "Pilotes";
      default:
        return "Tous";
    }
  }, [selectedGroup]);

  return (
    <Dashboard
      actualState="organisation"
      headerOptions={{
        title: "Tableau de bord",
      }}
    >
      <div className="flex items-center gap-4 justify-between">
        <Input
          placeholder="Rechercher un utilisateur..."
          className="max-w-[450px]"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex items-center gap-2">
          <p>Filtres:</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">{getButtonLabel()}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setSelectedGroup("All")}>
                  <Users className="mr-2 h-4 w-4" />
                  <span>Tous</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedGroup("Admin")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Administrateurs</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedGroup("Pilotes")}>
                  <Plane className="mr-2 h-4 w-4" />
                  <span>Pilotes</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 my-8">
        {users
          .filter((user) => {
            if (search.length > 0) {
              return (
                user.firstName.toLowerCase().includes(search.toLowerCase()) ||
                user.lastName.toLowerCase().includes(search.toLowerCase())
              );
            }
            if (selectedGroup === "All") return true;
            return user.group === selectedGroup;
          })
          .map((user) => (
            <Card key={user.id}>
              <CardHeader className="flex flex-col items-center justify-center">
                <Image src="/placeholder.svg" alt="avatar" width={75} height={75} className="w-[75%]" />
              </CardHeader>
              <CardContent>
                <p>
                  {user.firstName} {user.lastName}
                </p>
                <p>{user.email}</p>
              </CardContent>
            </Card>
          ))}
      </div>
    </Dashboard>
  );
}

export default function AuthOrganisation() {
  return <AuthGuard render={Organisation} />;
}
