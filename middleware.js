import { NextResponse } from 'next/server'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

const locales = ['en', 'es']
export const defaultLocale = 'en'

function getLocale (request) {
  const headers = new Headers(request.headers)
  const acceptLanguage = headers.get('accept-language')

  if (acceptLanguage) {
    headers.set('accept-language', acceptLanguage.replaceAll('_', '-'))
  }

  const headersObject = Object.fromEntries(headers.entries())
  const languages = new Negotiator({ headers: headersObject }).languages()
  return match(languages, locales, defaultLocale)
}

export function middleware (request) {
  const langCookie = request.cookies.get('lang')

  let locale
  if (langCookie) {
    if (locales.includes(langCookie.value)) locale = langCookie.value
  } else {
    locale = getLocale(request) ?? defaultLocale
  }

  const { pathname } = request.nextUrl
  console.log('pathname', pathname)

  const newUrl = new URL(`/${locale}${pathname}`, request.nextUrl)

  // e.g. incoming request is /products
  // The new URL is now /en/products
  return NextResponse.rewrite(newUrl)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|favicon.ico).*)'
    // Optional: only run on root (/) URL
    // '/'
  ]
}
