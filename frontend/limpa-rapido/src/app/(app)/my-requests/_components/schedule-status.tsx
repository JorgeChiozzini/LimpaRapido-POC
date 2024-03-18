import { Squircle } from 'lucide-react'

export interface Status {
  status: 'pending' | 'accepted' | 'rejected'
}

interface ScheduleStatusProps extends Status {}

export function ScheduleStatus({ status }: ScheduleStatusProps) {
  if (status === 'pending') {
    return (
      <div className="flex w-full items-center">
        <Squircle className="mr-2 h-3 w-3 fill-amber-500 text-amber-500" />
        Aguardando confirmação
      </div>
    )
  }

  if (status === 'accepted') {
    return (
      <div className="flex w-full items-center">
        <Squircle className="mr-2 h-3 w-3 fill-emerald-500 text-emerald-500" />
        Aceito
      </div>
    )
  }

  if (status === 'rejected') {
    return (
      <div className="flex w-full items-center">
        <Squircle className="mr-2 h-3 w-3 fill-rose-500 text-rose-500" />
        Rejeitado
      </div>
    )
  }
}
