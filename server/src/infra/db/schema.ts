import {
  text,
  integer,
  uuid,
  timestamp,
  varchar,
  pgTable,
} from 'drizzle-orm/pg-core'

import { randomUUID } from 'node:crypto'

export const linksTable = pgTable('links', {
  id: uuid()
    .$defaultFn(() => randomUUID())
    .primaryKey(),
  shortUrlSlug: varchar('short_url_slug', { length: 255 }).unique().notNull(),
  originalUrl: text('original_url').notNull(),
  accessCount: integer('access_count').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const schemas = {
  links: linksTable,
}
