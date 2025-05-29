import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { deleteLink } from '@/functions/delete-link'

export const deleteLinkRoute: FastifyPluginAsyncZod = async (app) => {
  app.delete(
    '/links/:shortUrlSlug',
    {
      schema: {
        tags: ['links'],
        description: 'Delete a link',
        params: z.object({
          shortUrlSlug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
            message: 'Short URL slug must be a valid slug',
          }),
        }),
      },
    },
    async (req, reply) => {
      const { shortUrlSlug } = req.params

      await deleteLink({ shortUrlSlug })

      reply.status(204).send()
    },
  )
}
