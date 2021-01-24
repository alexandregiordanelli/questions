import { urlEnv } from 'lib/utils'
export const postEmail = async (email: string): Promise<boolean> => {
  const response = await fetch(`${urlEnv}/api/email`, {
    method: 'POST',
    body: JSON.stringify(email),
    headers: { 'Content-Type': 'application/json' },
  })

  return response.ok
}
