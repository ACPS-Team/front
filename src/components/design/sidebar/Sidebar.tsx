import Link from "next/link";
import BookOpenIcon from "@/components/icons/sidebar/BookOpenIcon";
import ClipboardCheckIcon from "@/components/icons/sidebar/ClipboardCheckIcon";
import ClipboardListIcon from "@/components/icons/sidebar/ClipboardListIcon";
import HomeIcon from "@/components/icons/sidebar/HomeIcon";
import SettingsIcon from "@/components/icons/sidebar/SettingsIcon";
import PlaneIcon from "@/components/icons/sidebar/PlaneIcon";

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
    id: "formation",
    link: "#",
    name: "Formation",
    icon: <BookOpenIcon className="h-4 w-4" />,
  },
  {
    id: "pilotes",
    link: "#",
    name: "Pilotes",
    icon: <ClipboardListIcon className="h-4 w-4" />,
  },
  {
    id: "preparation-vols",
    link: "#",
    name: "Préparation des vols",
    icon: <ClipboardCheckIcon className="h-4 w-4" />,
  },
  {
    id: "settings",
    link: "#",
    name: "Paramètres",
    icon: <SettingsIcon className="h-4 w-4" />,
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
                  (actualState === state.id ? "bg-muted text-primary" : "text-muted-foreground")
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
