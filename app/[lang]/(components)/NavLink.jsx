'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

export const NavLink = ({ href, className, activeClassName, inactiveClassName, children }) => {
  const pathname = usePathname()
  const isActive = pathname === href
  const searchParams = useSearchParams()

  const contactMe = searchParams.get('contactMe')
  const newHref = contactMe ? `${href}?contactMe=true` : href

  return (
    <Link className={`${className} ${isActive ? activeClassName : inactiveClassName}`} href={newHref}>
      {children}
    </Link>
  )
}
