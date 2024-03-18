import { Button } from './ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'

const items = [
  {
    id: 'recents',
    label: 'Recents',
  },
  {
    id: 'home',
    label: 'Home',
  },
] as const

export function UserProfileDialog() {
  return (
    <DialogContent className="w-[960px] max-w-full">
      <DialogHeader>
        <DialogTitle>Perfil</DialogTitle>
        <DialogDescription>Atualize suas informações</DialogDescription>
      </DialogHeader>

      <div className="grid w-full grid-cols-9">
        <div className="col-span-3">sidebar</div>
        <div className="col-span-6">content</div>
      </div>
      {/* <form>
        <div className="space-y-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Seu nome</Label>
            <Input id="name" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" variant="success">
            Salvar
          </Button>
        </DialogFooter>
      </form> */}
    </DialogContent>
  )
}
