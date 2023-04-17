import React from 'react'
import PropTypes from 'prop-types'
import NewsletterSignup from '@/landing/NewsletterSignup'
import Section from '@/landing/Section'

const TertiaryCTA = ({
  header,
  trackLocation,
}) => {
  return (
    <Section
      fullWidth
    >
      <NewsletterSignup
        className={[
          'bg-white',
          'border-2',
          'border-green',
          'border-solid',
          'rounded-dialogue',
          'mx-5',
          'xs:mx-8',
          'p-6',
          'xs:p-10',
          'md:p-12',
          'max-w-2xl',
          'xs:mx-10',
          'sm:mx-auto',
        ].join(' ')}
        header={header}
        trackLocation={trackLocation}
      />
    </Section>
  )
}

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
