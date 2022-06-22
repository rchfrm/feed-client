import React from 'react'
import PropTypes from 'prop-types'

import MailchimpForm from '@/landing/elements/MailchimpForm'

import styles from '@/landing/NewsletterSignup.module.css'

const NewsletterSignup = ({
  header,
  ctaText,
  trackLocation,
  className,
}) => {
  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      {header && (
        <header className="text-center -mt-3 mb-8 sm:mb-10">
          <h2>{header}</h2>
        </header>
      )}
      <MailchimpForm
        inputClass={styles.emailInput}
        submitClass={styles.emailSubmit}
        disclaimerClass="hidden"
        trackLocation={trackLocation}
        ctaText={ctaText}
      />
    </div>
  )
}

NewsletterSignup.propTypes = {
  header: PropTypes.string,
  trackLocation: PropTypes.string,
  className: PropTypes.string,
}

NewsletterSignup.defaultProps = {
  header: '',
  trackLocation: '',
  className: null,
}

export default NewsletterSignup
