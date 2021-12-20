import React from 'react'
import Script from 'next/script'

const SetupReCaptcha = () => {
  return (
    <Script
      src={`https://www.google.com/recaptcha/enterprise.js?render=${process.env.recaptcha_key}`}
    />
  )
}

export default SetupReCaptcha
