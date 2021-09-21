import React from 'react'
import PropTypes from 'prop-types'

import NewsletterSignup from '@/landing/NewsletterSignup'

const DIVIDER = ({ pos }) => {
  const mY = pos === 'top' ? 'mb-10' : 'mt-10'
  return (
    <div className={`w-4 h-4 bg-green rounded-full mx-auto ${mY}`} />
  )
}

const BasicTextPageNewsletter = ({
  className,
  header,
  ctaText,
  trackLocation,
}) => {
  return (
    <div
      className={[
        'mb-10 xs:mb-12 sm:mb-16',
        className,
      ].join(' ')}
    >
      <DIVIDER pos="top" />
      <NewsletterSignup
        header={header}
        trackLocation={trackLocation}
        ctaText={ctaText}
      />
      <DIVIDER pos="bottom" />
    </div>
  )
}

BasicTextPageNewsletter.propTypes = {
  header: PropTypes.string,
  ctaText: PropTypes.string,
  trackLocation: PropTypes.string,
  className: PropTypes.string,
}

BasicTextPageNewsletter.defaultProps = {
  header: '',
  ctaText: 'Sign up',
  trackLocation: '',
  className: null,
}

export default BasicTextPageNewsletter
