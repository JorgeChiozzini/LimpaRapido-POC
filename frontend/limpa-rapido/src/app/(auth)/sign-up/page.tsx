'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { navigate } from '@/actions/redirect'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signUpForm = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

type SignUpForm = z.infer<typeof signUpForm>

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>()

  async function handleSignUp(data: SignUpForm) {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast.success('Conta criada com sucesso!', {
      action: {
        label: 'Entrar',
        onClick: () => navigate(`/sign-in?email=${data.email}`),
      },
    })
  }

  return (
    <div className="relative flex h-screen items-center justify-center">
      <Button asChild variant="ghost" className="absolute right-8 top-8 ">
        <Link href="/sign-in">Já possuo uma conta</Link>
      </Button>
      <div className="flex w-[350px] flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Criar uma conta grátis
          </h1>
          <p className="text-sm text-muted-foreground">
            Cadastre-se e comece a utilizar.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
          <div className="space-y-2">
            <Label htmlFor="name">Nome completo</Label>
            <Input id="name" type="text" {...register('name')} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Seu melhor e-mail</Label>
            <Input id="email" type="email" {...register('email')} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Senha</Label>
            <Input id="email" type="password" {...register('password')} />
          </div>

          <Button disabled={isSubmitting} className="w-full" type="submit">
            Criar conta
          </Button>
        </form>
      </div>
    </div>
  )
}
