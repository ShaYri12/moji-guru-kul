import { Method } from 'axios'
import { cookies } from 'next/headers'

export async function fetchRequest({ url, method, body, tags }: { url: string; method: Method; body?: any; tags?: string[] }) {
  const apiUrl = 'https://devapi.nukulum.com/api'
  let token = cookies().get('token')?.value
  try {
    const response = await fetch(`${apiUrl}/${url}`, {
      method: method,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
      next: { tags },
    })
    if (response?.ok) {
      if (response.headers.get('content-length') && response.headers.get('content-length') === '0') {
        return { responseType: response.status, message: response.statusText }
      }
      return await response.json()
    } else {
      const error = {
        status: response.status,
        statusText: response.statusText,
      }
      return { isError: true, error: error }
    }
  } catch (e) {
    console.log('in catch', e)
    return { isError: true, error: e }
  }
}
