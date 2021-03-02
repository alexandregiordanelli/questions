import { prisma } from '../../prisma/prisma'
import path from 'path'
import os from 'os'
import util from 'util'
import fs from 'fs'
import { pipeline } from 'stream'
import fetch from 'node-fetch'
import url from 'url'
import admin from 'lib/firebase-server'
import { MediaWithUrl } from 'lib/types'
import sizeOf from 'image-size'

const streamPipeline = util.promisify(pipeline)

const postMedias = async (medias: MediaWithUrl[]): Promise<boolean> => {
  const batch: unknown[] = []

  const customerId = medias[0].customerId

  for await (const _file of medias) {
    if (_file.customerId != customerId) {
      throw new Error(`customerId is different of others customerId from list.`)
    }

    if (_file.url) {
      const fileName = path.basename(url.parse(_file.url).pathname)
      const tempFilePath = path.join(os.tmpdir(), fileName)

      const responseImg = await fetch(_file.url)
      await streamPipeline(responseImg.body, fs.createWriteStream(tempFilePath))

      const bucket = admin.storage().bucket('assets.questionsof.com')

      const dimensions = sizeOf(tempFilePath)

      _file.width = dimensions.width
      _file.height = dimensions.height

      await bucket.upload(tempFilePath, {
        destination: `${customerId}/${_file.tag}`,
        metadata: {
          contentType: _file.mime,
        },
      })

      fs.unlinkSync(tempFilePath)
    }

    delete _file.id
    delete _file.url
    const media = prisma.media.create({
      data: _file,
    })

    batch.push(media)
  }

  const media = await prisma.$transaction(batch)

  return !!media
}
export default postMedias
