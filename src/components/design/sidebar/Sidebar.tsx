import { PlaneIcon, Settings, X } from 'lucide-react'
import Link from 'next/link'

import type { actualState } from '@/types/sidebar'
import { states } from '@/types/sidebar'

interface SidebarProps {
  actualState: actualState
  isMobileMenuOpen: boolean
  toggleMobileMenu: () => void
}

export default function Sidebar({
  actualState,
  isMobileMenuOpen,
  toggleMobileMenu
}: Readonly<SidebarProps>) {
  return (
    <div
      className={`border-r bg-muted fixed lg:relative h-full min-w-[50%] lg:min-w-[280px] z-50
        transform ${isMobileMenuOpen ? 'translate-x-full' : 'translate-x-[200%]'}
        lg:translate-x-0 transition-transform duration-300 ease-in-out lg:block`}
    >
      <div className="flex flex-col gap-2 h-full">
        <div className="flex h-[60px] items-center px-6">
          <Link href="#" className="flex items-center gap-2 font-semibold" prefetch={false}>
            <PlaneIcon className="h-6 w-6" />
            <span className="">ACPS</span>
          </Link>

          <X className="h-6 w-6 cursor-pointer ml-auto lg:hidden" onClick={toggleMobileMenu} />
        </div>
        <div className="flex-1 h-full">
          <nav className="px-4 pb-4 text-sm font-medium flex flex-col justify-between h-full">
            <div className="">
              {states.map((state, index) => (
                <div key={state.id}>
                  {state.items.map(item => (
                    <Link
                      key={item.id}
                      href={item.link}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                        actualState === item.id
                          ? 'bg-muted text-primary border-l-4 border-primary'
                          : 'text-muted-foreground'
                      }`}
                      prefetch={false}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  ))}
                  {index + 1 < states.length && (
                    <hr className="my-2 h-[2px] bg-gray-200 w-[80%] mx-auto" />
                  )}
                </div>
              ))}
            </div>
            <div>
              <Link
                href="/settings"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                  actualState === 'settings'
                    ? 'bg-muted text-primary border-l-4 border-primary'
                    : 'text-muted-foreground'
                }`}
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
  )
}
