import { createLink } from '@/functions/create-link'
import { db } from '@/infra/db'
import { schemas } from '@/infra/db/schema'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const createLinkRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/links',
    {
      schema: {
        body: z.object({
          shortUrlSlug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
            message: 'Short URL slug must be a valid slug',
          }),
          originalUrl: z.string().url(),
        }),
      },
    },
    async (req, reply) => {
      const { shortUrlSlug, originalUrl } = req.body

      await createLink({
        shortUrlSlug,
        originalUrl,
      })

      reply.status(201).send()
    },
  )
}
