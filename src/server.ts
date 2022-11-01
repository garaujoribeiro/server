import Fastify from 'fastify'
import cors from '@fastify/cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['query'],
})

const bootstrap = async () => {
  const fastify = Fastify({
    logger: true,
  })

  await fastify.register(cors, {
    origin: true,
  })

  // http://localhost:3333/

  fastify.get(('/pools/count'), async () => {
    const count = await prisma.pool.count({
      where: {
        code: {
          startsWith: 'T'
        }
      }
    })
    return { count }
  })



  await fastify.listen({ port: 3333, host: '0.0.0.0' })
}

bootstrap()