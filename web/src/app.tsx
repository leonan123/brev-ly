import { LinkIcon, SpinnerIcon } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'

import { CreateShortLinkForm } from './components/create-short-link-form'
import { DownloadCSVButton } from './components/download-csv-button'
import { LinksList } from './components/links-list'
import { LoadingBar } from './components/ui/loading-bar'
import { getLinks, type GetLinksResponse } from './http/get-links'

export function App() {
  const { data, isFetching, isLoading } = useQuery<GetLinksResponse>({
    queryKey: ['links'],
    queryFn: getLinks,
  })

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
          <div className="h-fit w-full space-y-5 rounded-lg bg-white p-6 md:max-w-[380px]">
            <h2 className="text-lg font-bold text-gray-600">Novo link</h2>

            <CreateShortLinkForm />
          </div>

          <div className="relative flex h-fit min-h-[234px] w-full flex-col space-y-4 overflow-hidden rounded-lg bg-white p-6">
            {isFetching && <LoadingBar />}

            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-600">Meus links</h2>

              <DownloadCSVButton disabled={data?.links.length === 0} />
            </div>

            {isLoading && (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 border-t border-gray-200">
                <SpinnerIcon size={32} className="animate-spin text-gray-400" />
                <p className="text-xs text-gray-500 uppercase">
                  Carregando links...
                </p>
              </div>
            )}

            {!isFetching && data?.links.length === 0 && (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 border-t border-gray-200">
                <LinkIcon size={32} className="text-gray-400" />
                <p className="text-xxs text-gray-500 uppercase">
                  Você ainda não criou nenhum link
                </p>
              </div>
            )}

            {data && data.links.length > 0 && <LinksList links={data.links} />}
          </div>
        </div>
      </div>
    </div>
  )
}
