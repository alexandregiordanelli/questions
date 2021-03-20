import { urlEnv } from 'lib/utils'
import fetch from 'node-fetch'
export const deleteClient = async (url: string, token = ''): Promise<number> => {
  try {
    const response = await fetch(`${urlEnv}${url}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.ok) {
      const res = Number(await response.text())
      return res
    } else {
      throw new Error(await response.text())
    }
  } catch (e) {
    console.log(e.message)
    return 0
  }
}
