import { env } from '../env'

export interface GetLinkResponse {
  id: string
  shortUrlSlug: string
  originalUrl: string
  accessCount: number
}

export async function getLink(shortUrlSlug: string) {
  const response = await fetch(`${env.VITE_BACKEND_URL}/links/${shortUrlSlug}`)

  if (!response.ok) {
    throw new Error('Não foi possível obter o link')
  }

  const linkData = (await response.json()) as GetLinkResponse

  return linkData
}
