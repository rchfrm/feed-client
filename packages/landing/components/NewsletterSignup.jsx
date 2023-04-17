import React from 'react'
import PropTypes from 'prop-types'
import MailchimpForm from '@/landing/elements/MailchimpForm'

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
        inputClass={[
          'w-full',
          'bg-white',
          'border-b-green',
          'border-b-2',
          'pb-1',
          'mb-4',
          'text-lg',
        ].join(' ')}
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
