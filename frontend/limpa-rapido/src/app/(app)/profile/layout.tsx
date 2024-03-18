import { ProfileSidebar } from './_components/profile-sidebar'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex-1">
      <div className="mx-auto grid w-full max-w-screen-xl grid-cols-12 gap-6 p-4">
        <div className="col-span-12 flex flex-col space-y-2 pb-5 pt-10">
          <h1 className="text-2xl font-semibold text-foreground">
            Detalhes do perfil
          </h1>
          <p className="font-regular text-md text-foreground">
            Mantenha seus dados atualizados.
          </p>
        </div>

        <div className="col-span-3">
          <ProfileSidebar />
        </div>
        <div className="col-span-9">{children}</div>
      </div>
    </div>
  )
}
