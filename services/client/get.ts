import { urlEnv } from 'lib/utils'
import fetch from 'node-fetch'
export const getClient = async <T>(_tags: string[]): Promise<T> => {
  try {
    const response = await fetch(`${urlEnv}/api/${_tags.join('/')}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      const res: T = await response.json()
      return res
    } else {
      throw new Error(await response.text())
    }
  } catch (e) {
    console.log(e.message)
  }
}
