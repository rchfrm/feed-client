import PropTypes from 'prop-types'

import MarkdownText from '@/landing/elements/MarkdownText'

import * as styles from '@/landing/TheFooter.module.css'

export default function TheFooterNavigationItem({ copy }) {
  return (
    <div
      className={[
        'w-full',
        'col-span-6',
        'xs:col-span-4',
        'sm:col-span-3',
      ].join(' ')}
    >
      <MarkdownText
        markdown={copy}
        className={[
          styles.footerColumnCopy,
          'pt-4',
        ].join(' ')}
      />
    </div>
  )
}

TheFooterNavigationItem.propTypes = {
  copy: PropTypes.string.isRequired,
}
