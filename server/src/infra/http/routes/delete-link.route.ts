import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { deleteLink } from '@/functions/delete-link'

export const deleteLinkRoute: FastifyPluginAsyncZod = async (app) => {
  app.delete(
    '/links/:id',
    {
      schema: {
        tags: ['links'],
        description: 'Delete a link',
        params: z.object({
          id: z.string().uuid(),
        }),
      },
    },
    async (req, reply) => {
      const { id } = req.params

      await deleteLink({ id })

      reply.status(204).send()
    },
  )
}
