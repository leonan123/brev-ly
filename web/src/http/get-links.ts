import type { Link } from '../_types/link'
import { env } from '../env'

export interface GetLinksResponse {
  links: Link[]
}

export async function getLinks() {
  const response = await fetch(`${env.VITE_BACKEND_URL}/links`)

  if (!response.ok) {
    throw new Error('Não foi possível obter os links')
  }

  const links = (await response.json()) as Link[]

  return {
    links,
  }
}
