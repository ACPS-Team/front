import Link from "next/link";
import {
  Calendar,
  CalendarClock,
  Euro,
  FileQuestion,
  Files,
  HomeIcon,
  PlaneIcon,
  PlaneTakeoff,
  Settings,
  Users,
} from "lucide-react";

export type actualState = "dashboard" | "formation" | "pilotes" | "preparation-vols" | "settings";

interface SidebarProps {
  actualState: actualState;
}

const states = [
  {
    id: "dashboard",
    link: "#",
    name: "Tableau de bord",
    icon: <HomeIcon className="h-4 w-4" />,
  },
  {
    id: "planning",
    link: "#",
    name: "Planning",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    id: "trombinoscope",
    link: "#",
    name: "Trombinoscope",
    icon: <Users className="h-4 w-4" />,
  },
  {
    id: "schedule",
    link: "#",
    name: "Réservations",
    icon: <CalendarClock className="h-4 w-4" />,
  },
  {
    id: "solde",
    link: "#",
    name: "Solde",
    icon: <Euro className="h-4 w-4" />,
  },
  {
    id: "flights",
    link: "#",
    name: "Mes vols",
    icon: <PlaneTakeoff className="h-4 w-4" />,
  },
  {
    id: "documents",
    link: "#",
    name: "Documents",
    icon: <Files className="h-4 w-4" />,
  },
  {
    id: "quiz",
    link: "#",
    name: "Quiz",
    icon: <FileQuestion className="h-4 w-4" />,
  },
  {
    id: "settings",
    link: "#",
    name: "Paramètres",
    icon: <Settings className="h-4 w-4" />,
  },
];

export default function Sidebar({ actualState }: SidebarProps) {
  return (
    <div className="hidden border-r bg-muted/40 lg:block">
      <div className="flex flex-col gap-2">
        <div className="flex h-[60px] items-center px-6">
          <Link href="#" className="flex items-center gap-2 font-semibold" prefetch={false}>
            <PlaneIcon className="h-6 w-6" />
            <span className="">ACPS</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-4 text-sm font-medium">
            {states.map((state) => (
              <Link
                key={state.id}
                href={state.link}
                className={
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary " +
                  (actualState === state.id
                    ? "bg-muted text-primary border-l-4 border-primary "
                    : "text-muted-foreground")
                }
                prefetch={false}
              >
                {state.icon}
                {state.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
