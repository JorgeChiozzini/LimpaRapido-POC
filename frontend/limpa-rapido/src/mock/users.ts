interface Cleaner {
  rating: number
  rates: number
  location: string
  cleanType: Array<string>
  amountPerHour: string
}

export interface User {
  name: string
  email: string
  avatarUrl: string
  password: string
  address: string
  isCleaner: boolean
  cleaner: Cleaner
}

export const usersMock = [
  {
    name: 'Gustavo Fonseca',
    email: 'gu.fonsecaa@gmail.com',
    avatarUrl: '/avatars/avatar4.png',
    password: '123456',
    address: 'Av Industrial 1600, Santo André - SP',
  },
  {
    name: 'Silvia Machado',
    email: 'silvia.machado@gmail.com',
    password: '123456',
    avatarUrl: '/avatars/avatar1.png',
    address: 'Rua Curitiba 442, Santo André - SP',
    isCleaner: true,
    cleaner: {
      rating: 4.8,
      rates: 10,
      location: 'Santo André, SP',
      cleanType: ['comercial', 'residencial'],
      amountPerHour: 'R$ 35',
    },
  },
] as User[]
