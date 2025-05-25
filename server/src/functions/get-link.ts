import { eq } from 'drizzle-orm'

import { db } from '@/infra/db'
import { schemas } from '@/infra/db/schema'

import { LinkNotFoundError } from './errors/link-not-found-error'

interface GetLinkInput {
  shortUrlSlug: string
}

export async function getLink(data: GetLinkInput) {
  const [link] = await db
    .select()
    .from(schemas.links)
    .where(eq(schemas.links.shortUrlSlug, data.shortUrlSlug))

  if (!link) {
    throw new LinkNotFoundError()
  }

  await db
    .update(schemas.links)
    .set({ accessCount: link.accessCount + 1 })
    .where(eq(schemas.links.id, link.id))

  return {
    link,
  }
}
