import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  if (!prisma) {
    prisma = new PrismaClient()
  }
} else {
  // @ts-ignore
  if (!global.prisma) {
    // @ts-ignore
    global.prisma = new PrismaClient({
        log: []//['query', 'info', 'warn'],
    })
  }

  // @ts-ignore
  prisma = global.prisma
}

prisma.$use(async (params, next) => {
    const before = Date.now();
    const result = await next(params);
    const after = Date.now();

    console.log(
      `Query ${params.model}.${params.action} took ${after - before}ms`
    );
    return result;
});

export { prisma }