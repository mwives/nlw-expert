import fastify from 'fastify'

import { createPoll } from './routes/create-poll'
import { getPoll } from './routes/get-poll'

const app = fastify()
const PORT = 3333

app.register(createPoll, getPoll)

app.listen({ port: PORT }).then(() => {
  console.log(`Server is running on port ${PORT}`)
})
