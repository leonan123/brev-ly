import {
  CheckIcon,
  CopyIcon,
  SpinnerGapIcon,
  TrashIcon,
} from '@phosphor-icons/react'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'

import type { Link } from '../_types/link'
import { deleteLink } from '../http/delete-link'
import { queryClient } from '../lib/react-query'
import { Button } from './ui/button'

interface LinksItemProps {
  link: Link
}

export function LinksItem({ link }: LinksItemProps) {
  const [isCopied, setIsCopied] = useState(false)

  const { mutate: deleteLinkMutation, isPending: isDeleting } = useMutation({
    mutationFn: () => deleteLink(link.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['links'],
      })

      toast.success('Link deletado com sucesso')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  function handleCopyLink(shortUrlSlug: string) {
    const link = `${window.location.origin}/${shortUrlSlug}`
    navigator.clipboard.writeText(link)

    setIsCopied(true)

    setTimeout(() => {
      setIsCopied(false)
    }, 1500)
  }

  const linkWithShortUrl = `${window.location.origin}/${link.shortUrlSlug}`

  return (
    <li
      key={link.id}
      className="flex items-center gap-4 border-t border-gray-200 py-3"
    >
      <div className="flex w-12 flex-1 flex-col gap-1">
        <a
          href={linkWithShortUrl}
          className="text-blue-base truncate text-sm font-semibold"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="hidden md:inline">{window.location.origin}/</span>
          <span>{link.shortUrlSlug}</span>
        </a>
        <span className="truncate text-xs text-gray-500">
          {link.originalUrl}
        </span>
      </div>

      <div className="">
        <span className="text-xs text-gray-500">
          {link.accessCount} acessos
        </span>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="icon"
          onClick={() => handleCopyLink(link.shortUrlSlug)}
        >
          {isCopied ? (
            <CheckIcon size={16} weight="bold" className="animate-copy" />
          ) : (
            <CopyIcon size={16} className="animate-copy" />
          )}
          <span className="sr-only">Copiar</span>
        </Button>

        <Button
          variant="icon"
          disabled={isDeleting}
          onClick={() => deleteLinkMutation()}
        >
          {isDeleting ? (
            <span className="animate-spin">
              <SpinnerGapIcon size={16} />
            </span>
          ) : (
            <>
              <TrashIcon size={16} />
              <span className="sr-only">Excluir</span>
            </>
          )}
        </Button>
      </div>
    </li>
  )
}
