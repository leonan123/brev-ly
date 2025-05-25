import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const test: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/test',
    {
      schema: {
        querystring: z.object({
          name: z.string(),
        }),
      },
    },
    async (req, reply) => {
      return {
        name: req.query.name,
      }
    },
  )
}
