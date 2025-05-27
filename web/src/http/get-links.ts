import { env } from '../env'

export async function getLinks() {
  const response = await fetch(`${env.VITE_BACKEND_URL}/links`)

  return response.json()
}
