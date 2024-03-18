'use server'
import { cookies } from 'next/headers'

import { User, usersMock } from '../mock/users'

export async function getUserByEmail(email: string): Promise<User | undefined> {
  return usersMock.find((user) => user.email === email)
}

export async function getAuthUser(): Promise<User | null> {
  const cookieStore = cookies()
  const user = cookieStore.get('@limpa-rapido::auth-user')

  if (user) {
    return JSON.parse(user.value)
  }

  return null
}
