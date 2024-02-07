import fastifyCookie from '@fastify/cookie'
import fastify from 'fastify'

import { createPoll } from './routes/create-poll'
import { getPoll } from './routes/get-poll'
import { voteOnPoll } from './routes/vote-on-poll'

const app = fastify()
const PORT = 3333

app.register(fastifyCookie, {
  secret: 'polls-app-nlw',
  hook: 'onRequest',
})

app.register(createPoll)
app.register(getPoll)
app.register(voteOnPoll)

app.listen({ port: PORT }).then(() => {
  console.log(`Server is running on port ${PORT}`)
})
