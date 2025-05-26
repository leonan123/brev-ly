import { db } from '@/infra/db'
import { schema } from '@/infra/db/schema'

export function fetchLinks() {
  return db.select().from(schema.links)
}
