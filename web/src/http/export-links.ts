import { env } from '../env'

export type ExportLinksResponse = {
  reportUrl: string
}

export async function exportLinks() {
  const response = await fetch(`${env.VITE_BACKEND_URL}/export-links`, {
    method: 'GET',
  })

  if (!response.ok) {
    throw new Error('Não foi possível exportar os links')
  }

  const data = (await response.json()) as ExportLinksResponse

  return {
    reportUrl: data.reportUrl,
  }
}
