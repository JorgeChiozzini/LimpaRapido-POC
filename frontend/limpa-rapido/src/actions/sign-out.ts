'use server'
import { cookies } from 'next/headers'

export async function signOut(): Promise<void> {
  cookies().delete('@limpa-rapido::auth-user')
}
