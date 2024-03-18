import { Calendar, Star } from 'lucide-react'
import { useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'

import { CleanerDialogDetails } from './cleaner-dialog-details'

export interface Cleaner {
  id: string
  name: string
  avatarUrl: string
  rating: number
  rates: number
  location: string
  cleanType: string[]
  amountPerHour: string
}

interface CleanerCardProps {
  cleaner: Cleaner
}

export function CleanerCard({ cleaner }: CleanerCardProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Card className="col-span-4">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar>
            <AvatarImage src={cleaner.avatarUrl} />
            <AvatarFallback>AV</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <CardTitle className="text-md text-foreground">
              {cleaner.name}
            </CardTitle>
            <div className="mt-1 flex items-center space-x-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium text-muted-foreground">
                {cleaner.rating} ({cleaner.rates} avaliações)
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex w-full items-center justify-between gap-4 rounded-lg border p-4 shadow-sm">
            <div className="flex-1">
              <p className="text-md font-medium text-foreground">
                {cleaner.location}
              </p>
              <p className="text-xs font-semibold uppercase text-muted-foreground">
                2.2Km
              </p>
            </div>
            <Separator orientation="vertical" className="h-10" />
            <div className="flex-1">
              <p className="text-md font-medium text-foreground">
                {cleaner.amountPerHour}
              </p>
              <p className="text-xs font-semibold uppercase text-muted-foreground">
                por hora
              </p>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-end space-x-2">
            <DialogTrigger asChild>
              <Button variant="ghost-primary">
                <Calendar className="mr-2 h-4 w-4" />
                Agendar
              </Button>
            </DialogTrigger>
          </div>
        </CardContent>
      </Card>

      <CleanerDialogDetails cleaner={cleaner} closeDialog={setOpen} />
    </Dialog>
  )
}
