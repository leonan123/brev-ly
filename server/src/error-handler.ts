import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { hasZodFastifySchemaValidationErrors } from 'fastify-type-provider-zod'

import { LinkNotFoundError } from './functions/errors/link-not-found-error'
import { ShortUrlAlreadyExistsError } from './functions/errors/short-url-already-exists-error'

export function errorHandler(
  err: FastifyError,
  _req: FastifyRequest,
  reply: FastifyReply,
) {
  console.error(err)

  if (hasZodFastifySchemaValidationErrors(err)) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: err.validation,
    })
  }

  if (err instanceof ShortUrlAlreadyExistsError) {
    return reply.status(409).send({
      message: err.message,
    })
  }

  if (err instanceof LinkNotFoundError) {
    return reply.status(404).send({
      message: err.message,
    })
  }

  return reply.status(500).send({
    message: 'Internal server error',
  })
}
