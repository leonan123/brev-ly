import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { exportLinks } from '@/functions/export-links'

export const exportLinksRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/export-links',
    {
      schema: {
        tags: ['links'],
        description: 'Export links to a CSV file',
        response: {
          200: z.object({
            reportUrl: z.string().url(),
          }),
        },
      },
    },
    async (_, reply) => {
      const { reportUrl } = await exportLinks()

      reply.status(200).send({
        reportUrl,
      })
    },
  )
}
