import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { createLinkRoute } from './infra/http/routes/create-link.route'
import { errorHandler } from './error-handler'
import { getLinkRoute } from './infra/http/routes/get-link.route'

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.setErrorHandler(errorHandler)

app.register(createLinkRoute)
app.register(getLinkRoute)
