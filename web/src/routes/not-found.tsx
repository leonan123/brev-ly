import { Link } from 'react-router'

export function NotFoundPage() {
  return (
    <div className="flex min-h-dvh flex-col justify-center bg-gray-200 p-3">
      <div className="relative mx-auto w-full max-w-[580px] space-y-6 overflow-hidden rounded-lg bg-white px-5 py-12 text-center lg:px-12 lg:py-16">
        <img
          src="/404.svg"
          alt="brev.ly"
          width={194}
          height={85}
          className="mx-auto"
        />

        <h1 className="text-2xl font-bold text-gray-600">
          Link não encontrado
        </h1>

        <p className="text-sm font-semibold text-gray-500">
          O link que você está tentando acessar não existe, foi removido ou é
          uma URL inválida.
        </p>

        <Link
          to="/"
          className="bg-blue-base hover:bg-blue-dark inline-flex h-12 items-center rounded-lg px-6 text-sm font-semibold text-white transition-colors"
        >
          Voltar para a home
        </Link>
      </div>
    </div>
  )
}
