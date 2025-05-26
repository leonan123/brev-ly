import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { createLink } from '@/functions/create-link'

export const createLinkRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/links',
    {
      schema: {
        tags: ['links'],
        description: 'Create a new link',
        body: z.object({
          shortUrlSlug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
            message: 'Short URL slug must be a valid slug',
          }),
          originalUrl: z.string().url(),
        }),
        response: {
          201: z.null(),
        },
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
