import { CopyIcon, TrashIcon } from '@phosphor-icons/react'

import { Button } from './ui/button'

interface Link {
  id: string
  originalUrl: string
  shortUrlSlug: string
  accessCount: number
  createdAt: Date
}

interface LinksListProps {
  links: Link[]
}

export function LinksList({ links }: LinksListProps) {
  return (
    <ul>
      {links.map((link) => (
        <li
          key={link.id}
          className="flex items-center gap-4 border-t border-gray-200 py-3"
        >
          <div className="flex w-[157px] flex-1 flex-col gap-1">
            <a
              href="#"
              className="text-blue-base truncate text-sm font-semibold"
            >
              brev.ly/{link.shortUrlSlug}
            </a>
            <span className="truncate text-xs text-gray-500">
              {link.originalUrl}
            </span>
          </div>

          <div>
            <span className="flex-1 text-xs text-gray-500">
              {link.accessCount} acessos
            </span>
          </div>

          <div className="flex items-center gap-1">
            <Button variant="icon">
              <CopyIcon size={16} />
              <span className="sr-only">Editar</span>
            </Button>

            <Button variant="icon">
              <TrashIcon size={16} />
              <span className="sr-only">Excluir</span>
            </Button>
          </div>
        </li>
      ))}
    </ul>
  )
}
