'use client'

import { AlarmClock, Bell, Calendar, Paintbrush, Search } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { getAuthUser } from '@/actions/get-user'
import { Separator } from '@/components/ui/separator'
import { User } from '@/mock/users'

import { AccountMenu } from './account-menu'
import { Button } from './ui/button'

export function Header() {
  const pathname = usePathname()

  const [user, setUser] = useState<User | null>(null)

  async function getUser() {
    const authUser = await getAuthUser()
    setUser(authUser)
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <div className="sticky top-0 z-50 border-b bg-background">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-6 p-4">
        <div className="flex flex-row items-center gap-2">
          <Paintbrush className="h-5 w-5 text-primary" />
          <span className="text-lg font-semibold">LimpaRápido</span>
        </div>

        <nav className="flex flex-1 items-center justify-center space-x-4 lg:space-x-10">
          <Link
            href="/"
            data-current={pathname === '/'}
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground data-[current=true]:text-foreground"
          >
            <Search className="h-4 w-4" />
            Buscar cleaners
          </Link>

          <Link
            href="/my-requests"
            data-current={pathname === '/my-requests'}
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground data-[current=true]:text-foreground"
          >
            <AlarmClock className="h-4 w-4" />
            Minhas solicitações
          </Link>

          {user?.isCleaner && (
            <Link
              href="/schedules"
              data-current={pathname === '/schedules'}
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground data-[current=true]:text-foreground"
            >
              <Calendar className="h-4 w-4" />
              Agendamentos
            </Link>
          )}
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Bell className="h-5 w-5" />
          </Button>
          <Separator orientation="vertical" className="h-5" />
          <AccountMenu />
        </div>
      </div>
    </div>
  )
}
