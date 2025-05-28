import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { getLink } from '@/functions/get-link'

export const getLinkRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/links/:shortUrlSlug',
    {
      schema: {
        tags: ['links'],
        description: 'Get a link',
        params: z.object({
          shortUrlSlug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
            message: 'Short URL slug must be a valid slug',
          }),
        }),
        response: {
          200: z.object({
            id: z.string().uuid(),
            accessCount: z.number(),
            shortUrlSlug: z.string(),
            originalUrl: z.string().url(),
          }),
        },
      },
    },
    async (req, reply) => {
      const { shortUrlSlug } = req.params

      const { link } = await getLink({ shortUrlSlug })

      reply.status(200).send({
        id: link.id,
        accessCount: link.accessCount,
        shortUrlSlug: link.shortUrlSlug,
        originalUrl: link.originalUrl,
      })
    },
  )
}
