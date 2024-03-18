import { Star } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/date-picker'
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'

import { Cleaner } from './cleaner-card'

interface CleanerDialogDetailsProps {
  cleaner: Cleaner
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  closeDialog: any
}

const requestFormSchema = z.object({
  date: z.date(),
  period: z.string(),
})

type RequestFormSchema = z.infer<typeof requestFormSchema>

export function CleanerDialogDetails({
  cleaner,
  closeDialog,
}: CleanerDialogDetailsProps) {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<RequestFormSchema>({
    defaultValues: { date: new Date(), period: '2 horas' },
  })

  async function handleSendRequest({ date, period }: RequestFormSchema) {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    closeDialog()
    toast.success(`Solicitação enviada para ${cleaner.name}`, {
      description: `Sua solicitação de serviço para o dia ${date.toLocaleDateString('pt-BR')} por um período de ${period} foi enviada.`,
    })
  }

  return (
    <DialogContent className="w-[480px]">
      <DialogHeader className="gap-6">
        <DialogTitle>Novo agendamento</DialogTitle>
        <div className="flex flex-row items-center gap-4">
          <Avatar>
            <AvatarImage src={cleaner.avatarUrl} />
            <AvatarFallback>AV</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h1 className="text-md font-semibold text-foreground">
              {cleaner.name}
            </h1>
            <div className="mt-1 flex items-center space-x-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium text-muted-foreground">
                {cleaner.rating} ({cleaner.rates} avaliações)
              </span>
            </div>
          </div>
        </div>
      </DialogHeader>

      <div className="mt-4">
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
      </div>

      <h1 className="mt-5 text-xs font-bold uppercase text-muted-foreground">
        Agendamento
      </h1>

      <form onSubmit={handleSubmit(handleSendRequest)}>
        <div className="grid grid-cols-5 gap-5 pb-10 pt-3">
          <div className="col-span-3 flex flex-col gap-3">
            <Label htmlFor="name">Data</Label>
            <Controller
              name="date"
              control={control}
              render={({ field: { onChange, value } }) => {
                return <DatePicker date={value} onChangeDate={onChange} />
              }}
            />
          </div>
          <div className="col-span-2 flex flex-col gap-3">
            <Label htmlFor="name">Período</Label>
            <Controller
              name="period"
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <Select onValueChange={onChange} defaultValue={value}>
                    <SelectTrigger>
                      <SelectValue placeholder="2 horas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2 horas">2 horas</SelectItem>
                      <SelectItem value="4 horas">4 horas</SelectItem>
                      <SelectItem value="6 horas">6 horas</SelectItem>
                      <SelectItem value="8 horas">8 horas</SelectItem>
                    </SelectContent>
                  </Select>
                )
              }}
            />
          </div>
          <div className="col-span-5 mt-2 flex flex-col gap-3">
            <Label htmlFor="name">Observações</Label>
            <Textarea placeholder="Adicione uma observação..." />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" variant="success" disabled={isSubmitting}>
            Enviar solicitação
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
