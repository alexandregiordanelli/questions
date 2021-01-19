import { NowRequest, NowResponse } from '@vercel/node'
import getMenu from '../../../services/getMenu'
export default async function (req: NowRequest, res: NowResponse): Promise<void> {
  const notebookTag = req.query.notebookTag as string

  const menu = await getMenu(notebookTag)

  res.json(menu)
}
