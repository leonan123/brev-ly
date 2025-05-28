import { env } from '../env'

export async function deleteLink(linkId: string) {
  const response = await fetch(`${env.VITE_BACKEND_URL}/links/${linkId}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Não foi possível deletar o link')
  }
}
