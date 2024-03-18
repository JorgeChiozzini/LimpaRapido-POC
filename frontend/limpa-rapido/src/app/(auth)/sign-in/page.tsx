'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { getUserByEmail } from '@/actions/get-user'
import { navigate } from '@/actions/redirect'
import { setAuthUser } from '@/actions/set-auth-user'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signInForm = z.object({
  email: z.string().email(),
  password: z.string().email(),
})

type SignInForm = z.infer<typeof signInForm>

export default function SignInPage() {
  const searchParams = useSearchParams()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>({
    defaultValues: { email: searchParams.get('email') ?? '' },
  })

  async function handleSignIn({ email }: SignInForm) {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const user = await getUserByEmail(email)

    if (user) {
      setAuthUser(user)
      navigate('/')
    } else {
      toast.error('E-mail e/ou senha incorretos.')
    }
  }

  return (
    <div className="relative flex h-screen items-center justify-center">
      <Button asChild variant="ghost" className="absolute right-8 top-8 ">
        <Link href="/sign-up">Criar conta grátis</Link>
      </Button>
      <div className="flex w-[350px] flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Acesse sua conta
          </h1>
          <p className="text-sm text-muted-foreground">
            Entre com seu e-mail e senha e comece a utilizar.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
          <div className="space-y-2">
            <Label htmlFor="email">Seu e-mail</Label>
            <Input id="email" type="email" {...register('email')} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Sua senha</Label>
            <Input id="email" type="password" {...register('password')} />
          </div>

          <Button disabled={isSubmitting} className="w-full" type="submit">
            Entrar
          </Button>
        </form>
      </div>
    </div>
  )
}
