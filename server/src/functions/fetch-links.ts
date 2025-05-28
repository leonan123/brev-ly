import { desc } from 'drizzle-orm'

import { db } from '@/infra/db'
import { schema } from '@/infra/db/schema'

export function fetchLinks() {
  return db.select().from(schema.links).orderBy(desc(schema.links.accessCount))
}
