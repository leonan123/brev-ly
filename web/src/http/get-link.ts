import { env } from '../env'

interface GetLinkResponse {
  originalUrl: string
}

export async function getLink(shortUrlSlug: string) {
  const response = await fetch(`${env.VITE_BACKEND_URL}/links/${shortUrlSlug}`)

  if (!response.ok) {
    throw new Error('Não foi possível obter o link')
  }

  const { originalUrl } = (await response.json()) as GetLinkResponse

  return {
    originalUrl,
  }
}
