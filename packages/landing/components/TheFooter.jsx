import TheFooterNavigationItem from '@/landing/TheFooterNavigationItem'
import TheFooterSocialLink from '@/landing/TheFooterSocialLink'
import TheFooterColophon from '@/landing/TheFooterColophon'

import copy from '@/landing/copy/LandingPageCopy'
import * as styles from '@/landing/TheFooter.module.css'

// Global info store
import useGlobalInfoStore from '@/landing/store/globalInfoStore'

const getGlobalInfo = state => state

const { footer: { socials, legalCopy } } = copy

const TheFooter = () => {
  // READ FROM GLOBAL STORE
  const { footerLinks: linkColumns, legalLinks } = useGlobalInfoStore(getGlobalInfo)

  return (
    <footer id="TheFooter" className={['section--padding', styles.theFooter].join(' ')}>
      <div className="bmw">
        <div className={styles.lineBreak} />
        {/* Footer columns */}
        <nav className={[
          'grid',
          'gap-4',
          'grid-cols-12',
          styles.footerColumns,
        ].join(' ')}
        >
          {/* Nav columns */}
          {linkColumns.map(({ links, id }) => {
            return (
              <TheFooterNavigationItem
                key={id}
                copy={links}
              />
            )
          })}
          {/* socialLinks */}
          <ul className={[
            styles.socialList,
            'col-span-12',
            'sm:col-span-3',
          ].join(' ')}
          >
            {socials.map((link, index) => {
              return <TheFooterSocialLink key={index} link={link} index={index} />
            })}
          </ul>
        </nav>

        <TheFooterColophon
          colophon={legalCopy.colophon}
          className={styles.colophon}
          legalLinks={legalLinks}
        />
      </div>
    </footer>
  )
}

export default TheFooter

// In the future
// -- request a new feature, see Buffer's Typeform
// -- product roadmap, see Buffer's link to a public Trello board
// -- specific feature pages
// -- customers
// -- investors area
