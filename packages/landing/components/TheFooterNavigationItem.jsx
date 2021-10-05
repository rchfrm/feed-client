import PropTypes from 'prop-types'

import MarkdownText from '@/landing/elements/MarkdownText'

import * as styles from '@/landing/TheFooter.module.css'

export default function TheFooterNavigationItem({ copy }) {
  return (
    <div
      className={[
        styles.theFooterNav,
        styles.footerColumn,
        'col-span-6',
        'xs:col-span-4',
        'sm:col-span-3',
      ].join(' ')}
    >
      <MarkdownText
        markdown={copy}
        className={styles.footerColumnCopy}
      />
      {/* <ul className={classes.list}>
        {copy.links.map(({ href, text }, index) => {
          return (
            <li key={index}>
              <p>
                <Anchor
                  className={[
                    'button--text',
                  ].join(' ')}
                  href={href}
                  activeClass="-active"
                >
                  <span className="button--inner">{text}</span>
                </Anchor>
              </p>
            </li>
          )
        })}
      </ul> */}
    </div>
  )
}

TheFooterNavigationItem.propTypes = {
  copy: PropTypes.string.isRequired,
}
