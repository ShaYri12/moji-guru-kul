'use server'

import { cookies } from 'next/headers'

export async function deleteCookies() {
  // await ['token', 'userRole', 'userId', 'expires'].forEach(async (cookieName) => {
  //   await cookies().delete(cookieName)
  // })
  cookies().delete('token')
  cookies().delete('userRole')
  cookies().delete('userId')
  cookies().delete('expires')
}

export async function setCookie(name: string, value: string) {
  cookies().set(name, value)
}
