'use server'
import { cookies } from 'next/headers'

import { User } from '../mock/users'

export async function setAuthUser(user: User): Promise<void> {
  cookies().set('@limpa-rapido::auth-user', JSON.stringify(user))
}
