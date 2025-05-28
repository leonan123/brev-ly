import { eq } from 'drizzle-orm'

import { db } from '../infra/db'
import { schema } from '../infra/db/schema'

interface DeleteLinkInput {
  id: string
}

export async function deleteLink(data: DeleteLinkInput): Promise<void> {
  await db.delete(schema.links).where(eq(schema.links.id, data.id))
}
