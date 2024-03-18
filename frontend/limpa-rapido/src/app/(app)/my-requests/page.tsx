'use client'

import { useEffect, useState } from 'react'

import { getAuthUser } from '@/actions/get-user'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { User } from '@/mock/users'

import { ScheduleStatus } from './_components/schedule-status'

const schedulesData = [
  {
    id: '1',
    cleaner: 'Silvia Machado',
    address: 'Av Industrial, 1600 - Santo André/SP ...',
    scheduleDate: '12/04/2024',
    status: 'pending',
    period: '4 horas',
    totalAmount: 'R$ 140,00',
  },
]

export default function SchedulesPage() {
  const [schedules] = useState(schedulesData)

  const [user, setUser] = useState<User | null>(null)

  async function getUser() {
    const authUser = await getAuthUser()
    setUser(authUser)
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <div className="flex-1">
      <div className="mx-auto grid w-full max-w-screen-xl grid-cols-12 gap-5 p-4">
        <div className="col-span-12 flex flex-col space-y-2 pb-5 pt-10">
          <h1 className="text-2xl font-semibold text-foreground">
            Suas solicitações
          </h1>
          <p className="font-regular text-md text-foreground">
            Aqui estão os suas solicitações enviadas.
          </p>
        </div>

        <div className="col-span-12">
          {user?.email === 'gu.fonsecaa@gmail.com' ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cleaner</TableHead>

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
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schedules.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="flex w-full flex-col gap-1">
                          <div className="font-medium text-foreground">
                            {item.cleaner}
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <span className="text-sm text-foreground">
              Nenhuma solicitação enviada.
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
