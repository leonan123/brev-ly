import { env } from '../env'

export async function deleteLink(shortUrlSlug: string) {
  const response = await fetch(
    `${env.VITE_BACKEND_URL}/links/${shortUrlSlug}`,
    {
      method: 'DELETE',
    },
  )

  if (!response.ok) {
    throw new Error('Não foi possível deletar o link')
  }
}
