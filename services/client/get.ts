import fetch from 'node-fetch'
import useSWR from 'swr'
import { DataBaseHook } from 'lib/types'
export const getClient = async <T>(url: string): Promise<T> => {
  try {
    const response = await fetch(`${url}`, {
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
    return null
  }
}

export const fetcher = <T>(url: string): Promise<T> => fetch(url).then((r) => r.json())

export const useData = <T>(url?: string, initialData: T = null): DataBaseHook<T> => {
  const { data, error } = useSWR<T>(url ?? null, fetcher, {
    initialData,
  })

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}
