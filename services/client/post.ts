import { urlEnv } from 'lib/utils'
import fetch from 'node-fetch'
export const postClient = async <T>(_customer: T, _tags: string[], token = ''): Promise<T> => {
  try {
    const response = await fetch(`${urlEnv}/api/${_tags.join('/')}`, {
      method: 'POST',
      body: JSON.stringify(_customer),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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
    return null
  }
}
export const postEmail = async (email: string): Promise<boolean> => {
  const response = await fetch(`/api/email`, {
    method: 'POST',
    body: JSON.stringify(email),
    headers: { 'Content-Type': 'application/json' },
  })

  return response.ok
}
