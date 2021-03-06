import { MediaWithUrl } from './types'
import slugify from 'slugify'
import { Media } from '@prisma/client'

export const letters = 'abcdefgh'.split('')
export const tokenForTest = process.env.TOKEN ?? ''

export const absolute = (base: string, relative: string): string => {
  const stack = base.split('/')
  const parts = relative.split('/')
  stack.pop()

  for (let i = 0; i < parts.length; i++) {
    if (parts[i] == '.') continue
    if (parts[i] == '..') stack.pop()
    else stack.push(parts[i])
  }
  return stack.join('/')
}
// export const parseQuestionMd = async (md: string) => {

//     const mdparsed = matter(md)

//     const meta = mdparsed.data as QuestionMetaOnRepo
//     const data = mdparsed.content

//     const firstData = data.split(/-\s\[[\sx]\]\s.*/gi)

//     const question = firstData[0].trim()
//     const solution = firstData.length > 1? firstData[firstData.length - 1].trim(): ''

//     let answer = -1
//     const options = []
//     const regexOptions = /-\s\[[\sx]\]\s(.*)/gi

//     var m
//     do {
//         m = regexOptions.exec(data);
//         if(m && m[0]){
//             options.push(m[1].trim())
//             const regexInternal = /-\s\[x\]\s/gi
//             if(regexInternal.test(m[0]))
//                 answer = options.length - 1
//         }
//     } while (m)

//     const resp: QuestionOnRepo = {
//         question,
//         solution,
//         options,
//         answer,
//         ...meta
//     }

//     return resp
// }

// export const parseReadMd = async (md: string) => {
//     const mdparsed = matter(md)
//     const meta = mdparsed.data as NotebookMetaOnRepo
//     const data = mdparsed.content

//     const resp: NotebookOnRepo = {
//         ...meta,
//         data
//     }

//     return resp
// }

export const getMediafromFile = (file: File): Promise<MediaWithUrl> => {
  return new Promise<MediaWithUrl>((resolve) => {
    const parts = file.name.split('.')
    const ext = parts[parts.length - 1]
    const media: MediaWithUrl = {
      width: null,
      height: null,
      ext,
      mime: file.type,
      size: file.size,
      name: file.name,
      id: 0,
      caption: null,
      createdAt: null,
      updatedAt: null,
      customerId: 0,
      tag: slugify(file.name, {
        lower: true,
      }),
      text: null,
      url: null,
    }

    if (file.type.toLowerCase().startsWith('image')) {
      const img = new Image()
      img.src = URL.createObjectURL(file)
      img.onload = () => {
        resolve({
          ...media,
          width: img.width,
          height: img.height,
          url: img.src,
        })
      }
    } else {
      resolve(media)
    }
  })
}
export const getURLMedia = (media?: Media): string =>
  media ? `https://assets.questionsof.com/${media.customerId}/${media.tag}` : ''
