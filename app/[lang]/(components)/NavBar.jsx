import Link from 'next/link'
import styles from '../(styles)/NavBar.module.css'
import LinkedinIcon from '@/icons/LinkedinIcon'
import { NavLink } from './NavLink'
import { DarkMode } from './DarkMode'
import { SelectLanguage } from './SelectLanguage'
import { MobileMenuButton } from './MobileMenuButton'

import dictionary from '@/content'

const useLinks = (lang) => {
  const links = [{
    label: dictionary[lang]?.navLinkHome,
    route: '/'
  }, {
    label: dictionary[lang]?.navLinkAbout,
    route: '/about'
  }, {
    label: dictionary[lang]?.navLinkProjects,
    route: '/projects'
  }]

  return links
}

export function NavBar ({ lang }) {
  const links = useLinks(lang)

  return (
    <header className={styles.header}>
      <MobileMenuButton />
      <section className={styles.linksList}>

        <nav className={styles.pageNavigation}>

          {links.map(({ label, route }) => (
            <NavLink key={route} className={styles.link} activeClassName={styles.linkActive} inactiveClassName={styles.linkInactive} href={route}>
              {label}
            </NavLink>
          ))}

        </nav>

        <nav className={styles.socialLinksNavigation}>
          <Link className={styles.rightIcon} href='https://linkedin.com/in/leonardo-aban-b31a15213' target='_blank'>
            <LinkedinIcon width='25px' height='25px' className={styles.socialLink} />
          </Link>
          <SelectLanguage lang={lang} />
        </nav>

      </section>
      <section className={styles.darkMode}>
        <DarkMode />
      </section>
    </header>
  )
}
