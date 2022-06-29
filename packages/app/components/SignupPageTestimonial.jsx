import React from 'react'
import PropTypes from 'prop-types'

import QuoteIcon from '@/icons/QuoteIcon'

import MarkdownText from '@/elements/MarkdownText'

import brandColors from '@/constants/brandColors'

const SignupPageTestimonial = ({ testimony }) => {
  const {
    handle,
    bio,
    quote,
    image: {
      responsiveImage,
    },
  } = testimony

  return (
    <div className="relative">
      <figure className="opacity-70">
        <img
          src={responsiveImage?.src}
          alt={`${handle}, ${bio}`}
          className={[
            'rounded-full',
            'w-40 h-40',
          ].join(' ')}
        />
      </figure>
      <MarkdownText className="relative w-3/4 -mt-11 ml-auto text-xl italic z-10" markdown={quote} />
      <QuoteIcon fill={brandColors.instagram.bg} className="-mt-11 ml-auto" />
    </div>
  )
}

SignupPageTestimonial.propTypes = {
  testimony: PropTypes.object.isRequired,
}

SignupPageTestimonial.defaultProps = {
}

export default SignupPageTestimonial
