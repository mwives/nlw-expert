import { FastifyInstance } from 'fastify'
import { prisma } from '../../lib/prisma'
import z from 'zod'

export async function getPoll(app: FastifyInstance) {
  app.get('/polls/:pollId', async (request, reply) => {
    const getPollParams = z.object({
      pollId: z.string().uuid(),
    })

    const { pollId } = getPollParams.parse(request.params)

    const poll = await prisma.poll.findUnique({
      where: {
        id: pollId,
      },
      include: {
        options: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    })

    if (!poll) {
      return reply.status(404).send({
        error: 'Poll not found',
      })
    }

    return reply.send({
      poll,
    })
  })
}
