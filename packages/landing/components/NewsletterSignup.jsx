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
        styles.mailchimp,
        'max-w-2xl',
        'xs:mx-10 sm:mx-auto',
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
        checkboxClass={styles.emailCheckbox}
        submitClass={styles.emailSubmit}
        disclaimerClass={styles.emailLegal}
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
