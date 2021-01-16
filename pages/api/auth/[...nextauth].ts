import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { NowRequest, NowResponse } from '@vercel/node'
import Adapters from 'next-auth/adapters'
import { prisma } from "../../../prisma/prisma"

const options = {
  // Configure one or more authentication providers
  providers: [
    Providers.Email({
        server: process.env.EMAIL_SERVER,
        from: process.env.EMAIL_FROM,
        // maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h) 
    })
    // ...add more providers here
  ],

  adapter: Adapters.Prisma.Adapter({ prisma }),
}

export default (req: NowRequest, res: NowResponse) => NextAuth(req, res, options)