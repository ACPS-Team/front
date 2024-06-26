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
    id: 0,
    items: [
      {
        id: "dashboard",
        link: "/",
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
        id: "quiz",
        link: "#",
        name: "Quiz",
        icon: <FileQuestion className="h-4 w-4" />,
      },
    ],
  },
  {
    id: 1,
    items: [
      {
        id: "documents",
        link: "#",
        name: "Documents",
        icon: <Files className="h-4 w-4" />,
      },
    ],
  },

  // {
  //   id: "settings",
  //   link: "#",
  //   name: "Paramètres",
  //   icon: <Settings className="h-4 w-4" />,
  // },
];

export default function Sidebar({ actualState }: Readonly<SidebarProps>) {
  return (
    <div className="hidden border-r bg-muted/40 lg:block">
      <div className="flex flex-col gap-2 h-full">
        <div className="flex h-[60px] items-center px-6">
          <Link href="#" className="flex items-center gap-2 font-semibold" prefetch={false}>
            <PlaneIcon className="h-6 w-6" />
            <span className="">ACPS</span>
          </Link>
        </div>
        <div className="flex-1 h-full">
          <nav className="px-4 pb-4 text-sm font-medium flex flex-col justify-between h-full">
            <div className="">
              {states.map((state, index) => (
                <div key={state.id}>
                  {state.items.map((item) => (
                    <Link
                      key={item.id}
                      href={item.link}
                      className={
                        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary " +
                        (actualState === item.id
                          ? "bg-muted text-primary border-l-4 border-primary "
                          : "text-muted-foreground")
                      }
                      prefetch={false}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  ))}
                  {index + 1 < states.length && <hr className="my-2 h-[2px] bg-gray-200 w-[80%] mx-auto" />}
                </div>
              ))}
            </div>
            <div>
              <Link
                href="/settings"
                className={
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary " +
                  (actualState === "settings"
                    ? "bg-muted text-primary border-l-4 border-primary "
                    : "text-muted-foreground")
                }
                prefetch={false}
              >
                <Settings className="h-4 w-4" />
                Paramètres
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
