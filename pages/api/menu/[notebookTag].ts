import { NowRequest, NowResponse } from '@vercel/node'
import getMenu from '../../../services/getMenu'

const MenuController = async (req: NowRequest, res: NowResponse): Promise<void> => {
  const notebookTag = req.query.notebookTag as string

  const menu = await getMenu(notebookTag)

  res.json(menu)
}

export default MenuController
