import { eq } from 'drizzle-orm'

import { db } from '../infra/db'
import { schemas } from '../infra/db/schema'

interface DeleteLinkInput {
  shortUrlSlug: string
}

export async function deleteLink(data: DeleteLinkInput): Promise<void> {
  await db
    .delete(schemas.links)
    .where(eq(schemas.links.shortUrlSlug, data.shortUrlSlug))
}
