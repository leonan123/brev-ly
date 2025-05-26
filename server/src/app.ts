import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { errorHandler } from './error-handler'
import { createLinkRoute } from './infra/http/routes/create-link.route'
import { deleteLinkRoute } from './infra/http/routes/delete-link.route'
import { exportLinksRoute } from './infra/http/routes/export-links.route'
import { fetchLinksRoute } from './infra/http/routes/fetch-links.route'
import { getLinkRoute } from './infra/http/routes/get-link.route'

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.setErrorHandler(errorHandler)

app.register(createLinkRoute)
app.register(getLinkRoute)
app.register(deleteLinkRoute)
app.register(fetchLinksRoute)
app.register(exportLinksRoute)
