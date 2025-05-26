import { eq } from 'drizzle-orm'

import { db } from '@/infra/db'
import { schema } from '@/infra/db/schema'

import { LinkNotFoundError } from './errors/link-not-found-error'

interface GetLinkInput {
  shortUrlSlug: string
}

export async function getLink(data: GetLinkInput) {
  const [link] = await db
    .select()
    .from(schema.links)
    .where(eq(schema.links.shortUrlSlug, data.shortUrlSlug))

  if (!link) {
    throw new LinkNotFoundError()
  }

  await db
    .update(schema.links)
    .set({ accessCount: link.accessCount + 1 })
    .where(eq(schema.links.id, link.id))

  return {
    link,
  }
}
