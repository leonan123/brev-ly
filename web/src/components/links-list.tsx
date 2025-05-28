import { LinksItem } from './links-item'

export interface Link {
  id: string
  originalUrl: string
  shortUrlSlug: string
  accessCount: number
  createdAt: Date
}

interface LinksListProps {
  links: Link[]
}

export function LinksList({ links }: LinksListProps) {
  return (
    <ul>
      {links.map((link) => (
        <LinksItem key={link.id} link={link} />
      ))}
    </ul>
  )
}
