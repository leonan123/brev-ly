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

  if (!response.ok) {
    throw new Error('Failed to create link')
  }

  console.log('Link created')
}
