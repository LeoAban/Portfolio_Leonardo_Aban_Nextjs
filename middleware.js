import { NextResponse } from 'next/server'

import { locales, defaultLocale } from '@/i18n.config'

import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

function getLocale (request) {
  const headers = new Headers(request.headers)

  const acceptLanguage = headers.get('accept-language')
  if (acceptLanguage) {
    headers.set('accept-language', acceptLanguage.replaceAll('_', '-'))
  }

  const headersObject = Object.fromEntries(headers.entries())
  const languages = new Negotiator({ headers: headersObject }).languages()
  return matchLocale(languages, locales, defaultLocale)
}


export function middleware (request) {
  const locale = getLocale(request) ?? defaultLocale

  const { pathname } = request.nextUrl

  const lang = request.cookies.get('NEXT_LOCALE')?.value

  if (lang) {
    const newUrl = new URL(`/${lang}${pathname}`, request.nextUrl)
    return NextResponse.rewrite(newUrl)
  }

  const newUrl = new URL(`/${locale}${pathname}`, request.nextUrl)
  return NextResponse.rewrite(newUrl)
}

export const config = {
  matcher: [
    '/((?!api|_next|_next/static|_next/image|favicon.ico|image|pdf).*)'
  ]
}
