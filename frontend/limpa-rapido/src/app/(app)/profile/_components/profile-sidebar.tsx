'use client'

import { Paintbrush, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function ProfileSidebar() {
  const pathname = usePathname()
  return (
    <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
      <Link
        href="/profile"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          pathname === '/profile'
            ? 'bg-muted hover:bg-muted'
            : 'hover:bg-transparent hover:underline',
          'items-center justify-start',
        )}
      >
        <User className="mr-2 h-5 w-5" />
        Meus detalhes
      </Link>
      <Link
        href="/profile/cleaner"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          pathname === '/profile/cleaner'
            ? 'bg-muted hover:bg-muted'
            : 'hover:bg-transparent hover:underline',
          'items-center justify-start',
        )}
      >
        <Paintbrush className="mr-2 h-5 w-5" />
        Cleaner
      </Link>
    </nav>
  )
}
