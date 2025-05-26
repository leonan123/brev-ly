import { useParams } from 'react-router'

interface LinkPageParams extends Record<string, string | undefined> {
  shortUrlSlug: string
}

export function LinkPage() {
  const params = useParams<LinkPageParams>()

  return <h1>Link page: {params.shortUrlSlug}</h1>
}
