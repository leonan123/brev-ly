import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'

import { getLink } from '../http/get-link'

interface LinkPageParams extends Record<string, string | undefined> {
  shortUrlSlug: string
}

export function RedirectPage() {
  const navigate = useNavigate()
  const { shortUrlSlug } = useParams<LinkPageParams>()

  const { data, isError, isLoading } = useQuery({
    queryKey: ['link', shortUrlSlug],
    queryFn: () => getLink(shortUrlSlug!),
    retry: false,
  })

  useEffect(() => {
    if (isError) {
      navigate('/url/not-found')
    }

    if (!isLoading && data) {
      window.location.href = data.originalUrl
    }
  }, [isLoading, isError, navigate, data])

  return (
    <div className="flex min-h-dvh flex-col justify-center bg-gray-200 p-3">
      <div className="relative mx-auto w-full max-w-[580px] space-y-6 overflow-hidden rounded-lg bg-white px-5 py-12 text-center lg:px-12 lg:py-16">
        <div className="bg-blue-base animate-loading-bar absolute top-0 h-0.5 w-[300px]" />

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
