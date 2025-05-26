import { eq } from 'drizzle-orm'

import { db } from '../infra/db'
import { schema } from '../infra/db/schema'
import { ShortUrlAlreadyExistsError } from './errors/short-url-already-exists-error'

interface CreateLinkInput {
  shortUrlSlug: string
  originalUrl: string
}

export async function createLink(data: CreateLinkInput) {
  const [slugAlreadyExists] = await db
    .select()
    .from(schema.links)
    .where(eq(schema.links.shortUrlSlug, data.shortUrlSlug))

  if (slugAlreadyExists) {
    throw new ShortUrlAlreadyExistsError()
  }

  await db.insert(schema.links).values(data)
}
