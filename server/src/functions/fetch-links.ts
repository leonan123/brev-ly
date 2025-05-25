import { db } from '@/infra/db'
import { schemas } from '@/infra/db/schema'

export function fetchLinks() {
  return db.select().from(schemas.links)
}
