import fastify from 'fastify'

import { createPoll } from './routes/create-poll'

const app = fastify()
const PORT = 3333

app.register(createPoll)

app.listen({ port: PORT }).then(() => {
  console.log(`Server is running on port ${PORT}`)
})
