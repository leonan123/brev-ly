import { DownloadSimpleIcon } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'

import { CreateShortLinkForm } from './components/create-short-link-form'
import { LinksList } from './components/links-list'
import { Button } from './components/ui/button'
import { getLinks } from './http/get-links'

interface Link {
  id: string
  originalUrl: string
  shortUrlSlug: string
  accessCount: number
  createdAt: Date
}

export function App() {
  const [links, setLinks] = useState([] as Link[])

  useEffect(() => {
    async function fetchLinks() {
      const links = await getLinks()
      setLinks(links)
    }

    fetchLinks()
  }, [])

  return (
    <div className="flex min-h-dvh flex-col justify-center bg-gray-200 lg:items-center">
      <div className="w-full max-w-[996px] space-y-8 px-3 py-8">
        <img
          src="/logo.svg"
          alt="brev.ly"
          width={96.67}
          height={24}
          className="mx-auto md:mx-0"
        />

        <div className="flex w-full flex-col gap-3 md:flex-row">
          <div className="w-full space-y-5 rounded-lg bg-white p-6 md:max-w-[380px]">
            <h2 className="text-lg font-bold text-gray-600">Novo link</h2>

            <CreateShortLinkForm />
          </div>

          <div className="w-full space-y-4 rounded-lg bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-600">Meus links</h2>

              <Button variant="secondary">
                <DownloadSimpleIcon
                  size={16}
                  className="shrink-0 text-gray-500"
                />
                <span>Baixar CSV</span>
              </Button>
            </div>

            <LinksList links={links} />
          </div>
        </div>
      </div>
    </div>
  )
}
