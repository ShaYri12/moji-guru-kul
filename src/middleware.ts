import createIntlMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { RolesEnum } from './utils/enum'
export default async function middleware(request: NextRequest) {
  const defaultLocale = request.headers.get('x-default-locale') || 'en'

  const handleI18nRouting = createIntlMiddleware({
    locales: ['en', 'te'],
    defaultLocale,
    localePrefix: 'never',
  })

  const response = handleI18nRouting(request)

  response.headers.set('x-default-locale', defaultLocale)

  /// REDIRECT USING x-middleware-rewrite HEADERS
  // const url = new URL(`/new-path/id`, request.url)
  // response.headers.set('x-middleware-rewrite', url.toString())

  const cookies = request.cookies.get('token')
  const userRole = request.cookies.get('userRole')?.value
  const token = cookies?.value
  const path = request.nextUrl.pathname
  // const locale = request.nextUrl.pathname.split('/')[1] || 'en'
  const locale = request.cookies.get('NEXT_LOCALE')?.value || 'en'

  const isPublicPath =
    path === `/` ||
    path === '/about-us' ||
    path === `/register-student` ||
    path === `/register-parent` ||
    path === `/register-educator` ||
    path === `/register-tutor` ||
    path === '/account-settings' ||
    path === `/contact-us` ||
    path === '/resources' ||
    path === '/resources/blog' ||
    path === '/ambassador/login' ||
    path === '/ambassador/register'

  // if path is public then return response
  if (isPublicPath) {
    return response
  }

  if (!token && request.nextUrl.pathname == '/ambassador') {
    return NextResponse.redirect(new URL(`/ambassador/login`, request.url))
  }

  if (!token && request.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL(`/`, request.url))
  }

  if (!token && userRole?.toLocaleLowerCase() === RolesEnum.Ambassador) {
    return NextResponse.redirect(new URL(`/ambassador/login`, request.url))
  }

  // if role is ambassador and path is not ambassador then redirect to /ambassador
  if (userRole?.toLocaleLowerCase() === RolesEnum.Ambassador && request.nextUrl.pathname !== '/ambassador') {
    return NextResponse.redirect(new URL(`/ambassador`, request.url))
  }

  if (token && userRole?.toLocaleLowerCase() !== RolesEnum.Ambassador && request.nextUrl.pathname.startsWith('/ambassador')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (token && userRole?.toLocaleLowerCase() === RolesEnum.Student && request.nextUrl.pathname !== '/ambassador') {
    return response
  }

  // if token is there then

  // if (isPublicPath) {
  //   console.log('++++++++++Public path++++++++++')
  //   return response
  // }
  console.log('path------', path)
  console.log('isPublicPath-------------', isPublicPath)

  // if (!isPublicPath && !token) {
  //   console.log('Redirecting to login due to missing token+++')
  //   return NextResponse.redirect(new URL(`/`, request.url), {
  //     status: 303,
  //   })
  //   // return to home page and change the path from url
  //   // const url = new URL(`/${locale}`, request.url)
  //   // response.headers.set('x-middleware-rewrite', url.toString())
  //   // return response
  // }

  // if role is parent and path is not parent then redirect to home
  // if (userRole === UserRole.Parent && path.split('/')[2] !== 'parent') {
  //   console.log('*******Parent path********')
  //   return NextResponse.redirect(new URL(`/parent`, request.url), {
  //     status: 303,
  //   })
  // }
  // if (userRole?.toLocaleLowerCase() === UserRole.Educator && path.split('/')[2] !== 'tutor') {
  //   console.log('*******Tutor path********')
  //   return NextResponse.redirect(new URL(`/tutor`, request.url), {
  //     status: 303,
  //   })
  // }

  console.log('****Global path****')
  return response
}

export const config = {
  matcher: [
    '/((?!_next|.*\\..*).*)',
    // matcher for localePrefix as-needed
    // '/((?!_next|.*\\..*).*)',
  ],
}
