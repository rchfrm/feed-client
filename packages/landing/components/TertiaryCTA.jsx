import React from 'react'
import PropTypes from 'prop-types'

import NewsletterSignup from '@/NewsletterSignup'

import * as primaryStyles from '@/PrimaryCTA.module.css'

const TertiaryCTA = React.forwardRef(({
  header,
  trackLocation,
}, ref) => {
  return (
    <section
      ref={ref}
      className={[
        'section--padding',
        primaryStyles.primaryCTASection,
      ].join(' ')}
    >
      <NewsletterSignup
        header={header}
        trackLocation={trackLocation}
      />
    </section>
  )
})

TertiaryCTA.displayName = 'TertiaryCTA'

export default TertiaryCTA

TertiaryCTA.propTypes = {
  header: PropTypes.string,
  trackLocation: PropTypes.string,
}

TertiaryCTA.defaultProps = {
  header: '',
  trackLocation: 'feed-landing',
}
