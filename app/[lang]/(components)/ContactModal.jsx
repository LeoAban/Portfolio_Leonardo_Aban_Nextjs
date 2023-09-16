'use client'

import ContactMe from './ContactMe'

import { useSearchParams } from 'next/navigation'

export const ContactModal = () => {
  const searchParams = useSearchParams()

  const contactMe = searchParams.get('contactMe')

  return (
    <>
      {contactMe && <ContactMe />}
    </>
  )
}
