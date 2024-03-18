'use client'
import { FilterX, Search } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { CleanerCard } from './_components/cleaner-card'

const cleanersData = [
  {
    id: '1',
    name: 'Silvia Machado',
    avatarUrl: '/avatars/avatar1.png',
    rating: 4.8,
    rates: 10,
    location: 'Santo André, SP',
    cleanType: ['comercial', 'residencial'],
    amountPerHour: 'R$ 35',
  },
  {
    id: '2',
    name: 'Juliana Matos',
    avatarUrl: '/avatars/avatar2.png',
    rating: 4.5,
    rates: 15,
    location: 'São Bernardo, SP',
    cleanType: ['residencial'],
    amountPerHour: 'R$ 45',
  },
  {
    id: '3',
    name: 'Adriana Silva',
    avatarUrl: '/avatars/avatar3.png',
    rating: 4.2,
    rates: 25,
    location: 'São Bernardo, SP',
    cleanType: ['comercial'],
    amountPerHour: 'R$ 68',
  },
]

const cleanerFilterFormSchema = z.object({
  name: z.string(),
  cleanType: z.string(),
})

type CleanerFilterFormSchema = z.infer<typeof cleanerFilterFormSchema>

export default function SearchCleanerPage() {
  const [cleaners, setCleaners] = useState(cleanersData)

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<CleanerFilterFormSchema>({ defaultValues: { cleanType: 'all' } })

  function handleCleanFilters() {
    setCleaners(cleanersData)
  }

  async function handleFilterCleaners({
    name,
    cleanType,
  }: CleanerFilterFormSchema) {
    if (!!name || cleanType !== 'all') {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      let filteredList = cleanersData

      if (name) {
        filteredList = filteredList.filter((cleaner) =>
          cleaner.name.includes(name),
        )
      }

      if (cleanType !== 'all') {
        filteredList = filteredList.filter((cleaner) =>
          cleaner.cleanType.indexOf(cleanType),
        )
      }

      setCleaners(filteredList)
    } else {
      setCleaners(cleanersData)
    }
  }

  return (
    <div className="flex-1">
      <div className="mx-auto grid w-full max-w-screen-xl grid-cols-12 gap-5 p-4">
        <div className="col-span-12 flex flex-col space-y-2 pb-5 pt-10">
          <h1 className="text-2xl font-bold text-foreground">
            Busque por novos Cleaners
          </h1>
          <p className="text-md text-foreground">
            Veja os cleaners que estão disponíveis aguardando seu contato.
          </p>
        </div>

        <div className="col-span-12 mb-5">
          <form onSubmit={handleSubmit(handleFilterCleaners)}>
            <div className="flex items-end gap-5">
              <div className="flex flex-col gap-2">
                <Label>Nome</Label>
                <Input
                  className="w-80"
                  placeholder="Buscar por nome..."
                  {...register('name')}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Tipo de faxina</Label>
                <Controller
                  name="cleanType"
                  control={control}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <Select onValueChange={onChange} defaultValue={value}>
                        <SelectTrigger className="w-52">
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="all">Todos</SelectItem>
                            <SelectItem value="comercial">Comercial</SelectItem>
                            <SelectItem value="residencial">
                              Residencial
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )
                  }}
                />
              </div>

              <Button variant="outline" type="submit" disabled={isSubmitting}>
                <Search className="mr-2 h-4 w-4" />
                Buscar
              </Button>
              <Button
                variant="outline"
                type="button"
                onClick={handleCleanFilters}
              >
                <FilterX className="mr-2 h-4 w-4" />
                Limpar filtros
              </Button>
            </div>
          </form>
        </div>

        {cleaners.map((item) => (
          <CleanerCard key={item.id} cleaner={item} />
        ))}
      </div>
    </div>
  )
}
