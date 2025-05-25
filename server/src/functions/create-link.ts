import { eq } from 'drizzle-orm'

import { db } from '../infra/db'
import { schemas } from '../infra/db/schema'
import { ShortUrlAlreadyExistsError } from './errors/short-url-already-exists-error'

interface CreateLinkInput {
  shortUrlSlug: string
  originalUrl: string
}

export async function createLink(data: CreateLinkInput) {
  const [slugAlreadyExists] = await db
    .select()
    .from(schemas.links)
    .where(eq(schemas.links.shortUrlSlug, data.shortUrlSlug))

  if (slugAlreadyExists) {
    throw new ShortUrlAlreadyExistsError()
  }

  await db.insert(schemas.links).values(data)
}
