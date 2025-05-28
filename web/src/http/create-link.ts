import { env } from '../env'

interface CreateLinkInput {
  shortUrlSlug: string
  originalUrl: string
}

export async function createLink(data: CreateLinkInput) {
  const response = await fetch(`${env.VITE_BACKEND_URL}/links`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (response.status === 409) {
    throw new Error('Esse link encurtado já existe')
  }

  if (!response.ok) {
    throw new Error('Não foi possível criar o link')
  }
}
