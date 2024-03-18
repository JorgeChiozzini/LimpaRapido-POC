'use client'

import { Check, Star, X } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { ScheduleStatus } from './_components/schedule-status'

const schedulesData = [
  {
    id: '1',
    client: 'Gustavo Fonseca',
    address: 'Av Industrial, 1600 - Santo André/SP ...',
    scheduleDate: '12/04/2024',
    status: 'pending',
    period: '4 horas',
    totalAmount: 'R$ 140,00',
    rating: 4.9,
  },
  {
    id: '2',
    client: 'João Jonas',
    address: 'Av Industrial, 1600 - Santo André/SP ...',
    scheduleDate: '13/04/2024',
    status: 'pending',
    period: '8 horas',
    totalAmount: 'R$ 280,00',
    rating: 4.2,
  },
  {
    id: '3',
    client: 'Tiago Lopes',
    address: 'Av Pres. Kennedy, 843 - São Bernardo do Campo /SP ...',
    scheduleDate: '14/04/2024',
    status: 'accepted',
    period: '8 horas',
    totalAmount: 'R$ 280,00',
    rating: 3.8,
  },
  {
    id: '4',
    client: 'Marcia dos Santos',
    address: 'Rua Jorge Beretta, 188 - Santo André /SP ...',
    scheduleDate: '19/04/2024',
    status: 'rejected',
    period: '2 horas',
    totalAmount: 'R$ 70,00',
    rating: 5,
  },
]

export default function SchedulesPage() {
  const [schedules, setSchedules] = useState(schedulesData)

  async function handleAcceptItem(itemId: string) {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const updatedSchedules = schedules.map((item) => {
      if (item.id === itemId) {
        item.status = 'accepted'
      }

      return item
    })

    setSchedules(updatedSchedules)
  }

  async function handleRejectItem(itemId: string) {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const updatedSchedules = schedules.map((item) => {
      if (item.id === itemId) {
        item.status = 'rejected'
      }

      return item
    })

    setSchedules(updatedSchedules)
  }

  return (
    <div className="flex-1">
      <div className="mx-auto grid w-full max-w-screen-xl grid-cols-12 gap-5 p-4">
        <div className="col-span-12 flex flex-col space-y-2 pb-5 pt-10">
          <h1 className="text-2xl font-semibold text-foreground">
            Seus agendamentos
          </h1>
          <p className="font-regular text-md text-foreground">
            Aqui estão os seus próximos agendamentos.
          </p>
        </div>

        <div className="col-span-12">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>

                  <TableHead className="w-[280px] text-sm text-muted-foreground">
                    Status
                  </TableHead>
                  <TableHead className="w-[200px] text-sm text-muted-foreground">
                    Data do agendamento
                  </TableHead>
                  <TableHead className="w-[140px] text-sm text-muted-foreground">
                    Período
                  </TableHead>
                  <TableHead className="w-[200px] text-sm text-muted-foreground">
                    Valor total (R$)
                  </TableHead>
                  <TableHead className="w-[140px]">Ação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedules.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex w-full flex-col gap-1">
                        <div className="flex items-center font-medium text-foreground">
                          {item.client}

                          <div className="ml-2 flex items-center space-x-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs font-medium text-muted-foreground">
                              {item.rating}
                            </span>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {item.address}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      <ScheduleStatus
                        status={
                          item.status as 'pending' | 'accepted' | 'rejected'
                        }
                      />
                    </TableCell>
                    <TableCell className="text-sm text-foreground">
                      {item.scheduleDate}
                    </TableCell>
                    <TableCell className="text-sm text-foreground">
                      {item.period}
                    </TableCell>
                    <TableCell className="text-sm text-foreground">
                      {item.totalAmount}
                    </TableCell>
                    <TableCell>
                      {item.status === 'pending' && (
                        <div className="flex items-center gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => handleAcceptItem(item.id)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Separator className="h-5" orientation="vertical" />
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => handleRejectItem(item.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}
