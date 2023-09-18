import { ContactModal } from './ContactModal'

export default function Main ({ children, className }) {
  return (
    <main className={className}>
      {children}
      <ContactModal />
    </main>
  )
}
