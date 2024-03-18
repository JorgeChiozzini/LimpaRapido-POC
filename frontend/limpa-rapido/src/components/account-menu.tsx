import { LogOut, User2 } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { getAuthUser } from '@/actions/get-user'
import { navigate } from '@/actions/redirect'
import { signOut } from '@/actions/sign-out'
import { User } from '@/mock/users'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export function AccountMenu() {
  const [user, setUser] = useState<User | null>(null)

  async function getUser() {
    const authUser = await getAuthUser()
    setUser(authUser)
  }

  useEffect(() => {
    getUser()
  }, [])

  function handleSignOut() {
    signOut()
    navigate('/sign-in')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarImage src={user?.avatarUrl} />
          <AvatarFallback>AV</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 space-y-1">
        <DropdownMenuLabel className="py-2">
          <div className="flex flex-col space-y-1">
            <span className="text-base text-foreground">{user?.name}</span>
            <span className="text-sm font-normal text-muted-foreground">
              {user?.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/profile">
          <DropdownMenuItem className="flex h-full items-center">
            <User2 className="mr-2 h-4 w-4" />
            <span>Perfil</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <button className="w-full" onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sair</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
