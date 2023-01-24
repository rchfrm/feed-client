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
      <figure>
        <img
          src={responsiveImage?.src}
          alt={`${handle}, ${bio}`}
          className={[
            'rounded-full',
            'w-40 h-40',
          ].join(' ')}
        />
      </figure>
      <div className="relative w-3/4 -mt-11 p-2.5 ml-auto bg-offwhite bg-opacity-75 rounded-dialogue text-xl">
        <MarkdownText markdown={quote} />
        <p className="font-bold mb-1">@{handle}</p>
        <p>{bio}</p>
      </div>
      <QuoteIcon fill={brandColors.instagram.bg} className="relative -mt-12 ml-auto" />
    </div>
  )
}

SignupPageTestimonial.propTypes = {
  testimony: PropTypes.object.isRequired,
}

SignupPageTestimonial.defaultProps = {
}

export default SignupPageTestimonial
