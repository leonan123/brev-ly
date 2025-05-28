import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'

import { LoadingBar } from '../components/ui/loading-bar'
import { getLink, type GetLinkResponse } from '../http/get-link'
import type { GetLinksResponse } from '../http/get-links'
import { queryClient } from '../lib/react-query'

interface LinkPageParams extends Record<string, string | undefined> {
  shortUrlSlug: string
}

export function RedirectPage() {
  const navigate = useNavigate()

  const { shortUrlSlug } = useParams<LinkPageParams>()

  const {
    data: fetchedLink,
    isError: hasError,
    isLoading: isFetchingLink,
  } = useQuery<GetLinkResponse>({
    queryKey: ['link', shortUrlSlug],
    queryFn: async () => {
      const fetchedData = await getLink(shortUrlSlug!)

      queryClient.setQueryData<GetLinksResponse>(['links'], (cachedData) => {
        if (!cachedData) return

        return {
          links: cachedData.links.map((cachedLink) => {
            if (cachedLink.id === fetchedData.id) {
              return {
                ...cachedLink,
                accessCount: fetchedData.accessCount,
              }
            }

            return cachedLink
          }),
        }
      })

      return fetchedData
    },
    retry: false,
  })

  useEffect(() => {
    if (hasError) {
      navigate('/url/not-found')
    }

    if (!isFetchingLink && fetchedLink) {
      window.location.href = fetchedLink.originalUrl
    }
  }, [isFetchingLink, hasError, navigate, fetchedLink])

  return (
    <div className="flex min-h-dvh flex-col justify-center bg-gray-200 p-3">
      <div className="relative mx-auto w-full max-w-[580px] space-y-6 overflow-hidden rounded-lg bg-white px-5 py-12 text-center lg:px-12 lg:py-16">
        <LoadingBar />

        <img
          src="/logo-icon.svg"
          alt="brev.ly"
          width={48}
          height={48}
          className="mx-auto"
        />

        <h1 className="text-2xl font-bold text-gray-600">Redirecionando...</h1>

        <p className="text-sm font-semibold text-gray-500">
          O link será aberto automaticamente em alguns instantes. <br />
          Não foi redirecionado?{' '}
          <a
            href="#"
            target="_blank"
            className="text-blue-base hover:underline"
          >
            Acesse aqui
          </a>
        </p>
      </div>
    </div>
  )
}
