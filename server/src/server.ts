import { app } from './app'
import { env } from './env'

app.listen({ port: env.PORT }, () => {
  console.log(`🚀 HTTP server running on http://localhost:${env.PORT}`)
})
