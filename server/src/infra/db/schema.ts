import { randomUUID } from 'node:crypto'

import {
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'

export const linksTable = pgTable('links', {
  id: uuid()
    .$defaultFn(() => randomUUID())
    .primaryKey(),
  shortUrlSlug: varchar('short_url_slug', { length: 255 }).unique().notNull(),
  originalUrl: text('original_url').notNull(),
  accessCount: integer('access_count').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const schema = {
  links: linksTable,
}
