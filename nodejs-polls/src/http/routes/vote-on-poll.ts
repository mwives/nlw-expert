import { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'
import z from 'zod'

import { prisma } from '../../lib/prisma'
import { redis } from '../../lib/redis'
import { votingPubSub } from '../utils/voting-pub-sub'

export async function voteOnPoll(app: FastifyInstance) {
  app.post('/polls/:pollId/vote', async (request, reply) => {
    const voteOnPollBody = z.object({
      pollOptionId: z.string().uuid(),
    })
    const voteOnPollParams = z.object({
      pollId: z.string().uuid(),
    })

    const { pollOptionId } = voteOnPollBody.parse(request.body)
    const { pollId } = voteOnPollParams.parse(request.params)

    let { sessionId } = request.cookies

    if (sessionId) {
      const existingVote = await prisma.vote.findUnique({
        where: {
          sessionId_pollId: {
            sessionId,
            pollId,
          },
        },
      })

      if (existingVote && existingVote.pollOptionId !== pollOptionId) {
        await prisma.vote.delete({
          where: {
            id: existingVote.id,
          },
        })

        const votes = await redis.zincrby(pollId, -1, existingVote.pollOptionId)

        votingPubSub.publish(pollId, {
          pollOptionId: existingVote.pollOptionId,
          votes: Number(votes),
        })
      } else if (existingVote) {
        return reply
          .status(400)
          .send({ error: 'You have already voted on this poll' })
      }
    } else {
      sessionId = randomUUID()

      reply.setCookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        signed: true,
        httpOnly: true,
      })
    }

    await prisma.vote.create({
      data: {
        sessionId,
        pollId,
        pollOptionId,
      },
    })

    const votes = await redis.zincrby(pollId, 1, pollOptionId)

    votingPubSub.publish(pollId, {
      pollOptionId,
      votes: Number(votes),
    })

    return reply.status(201).send()
  })
}
