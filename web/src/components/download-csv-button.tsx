import { DownloadSimpleIcon, SpinnerIcon } from '@phosphor-icons/react'
import { type ComponentProps, useTransition } from 'react'

import { exportLinks } from '../http/export-links'
import { Button } from './ui/button'

type DownloadCSVButtonProps = ComponentProps<'button'>

export function DownloadCSVButton({
  disabled,
  ...props
}: DownloadCSVButtonProps) {
  const [isPending, startTransition] = useTransition()

  async function handleClick() {
    startTransition(async () => {
      const { reportUrl } = await exportLinks()

      const fileName = reportUrl.split('/').pop()
      const link = document.createElement('a')

      link.href = reportUrl
      link.download = fileName || 'links.csv'
      link.click()
      link.remove()
    })
  }

  return (
    <Button
      variant="secondary"
      disabled={disabled || isPending}
      onClick={handleClick}
      {...props}
    >
      {isPending ? (
        <SpinnerIcon size={16} className="shrink-0 animate-spin" />
      ) : (
        <DownloadSimpleIcon size={16} className="shrink-0 text-gray-500" />
      )}
      <span>Baixar CSV</span>
    </Button>
  )
}
