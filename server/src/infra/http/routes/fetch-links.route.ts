import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { fetchLinks } from '@/functions/fetch-links'

export const fetchLinksRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/links',
    {
      schema: {
        response: {
          200: z.array(
            z.object({
              id: z.string().uuid(),
              shortUrlSlug: z.string(),
              originalUrl: z.string().url(),
              accessCount: z.number(),
              createdAt: z.date(),
            }),
          ),
        },
      },
    },
    async (_, reply) => {
      const links = await fetchLinks()

      reply.status(200).send(links)
    },
  )
}
