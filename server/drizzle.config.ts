import { env } from './src/env'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  out: './src/infra/db/migrations',
  schema: './src/infra/db/schema.ts',
  dialect: 'postgresql',
})
