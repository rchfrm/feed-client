import React from 'react'
import ButtonFacebook from 'shared/components/elements/ButtonFacebook'
import * as firebaseHelpers from 'shared/helpers/firebaseHelpers'
import { fireSentryError } from 'app/helpers/sentryHelpers'
import Error from 'shared/components/elements/Error'
import { Link } from 'react-router-dom'

export default function HeroSignUp() {
  const [error, setError] = React.useState(null)
  // Calls firebaseHelpers.signupWithFacebook using a redirect,
  // so that when user is returned to log in page handleRedirect is triggered
  const facebookSignup = async () => {
    firebaseHelpers.signUpWithFacebook()
      .catch((error) => {
        setError(error)
        // Sentry error
        fireSentryError({
          category: 'sign up',
          action: 'error clicking on FB button',
        })
      })
  }
  return (
    <div
      className={[
        'pb-8',
        'col-span-12',
        'gap-4',
        'row-start-2',
        'col-start-1',

        'xs:grid',
        'xs:grid-cols-12',
        'xs:items-center',

        'lg:col-start-1',
        'lg:col-end-7',
        'lg:grid-cols-6',
        'lg:z-10',
      ].join(' ')}
    >
      <ButtonFacebook
        onClick={facebookSignup}
        className={[
          'w-full',
          'xs:w-auto',

          'xs:col-span-6',

          'lg:col-span-4',
        ].join(' ')}
        fallbackCta="Sign up with Facebook"
      >
        Sign up with Facebook
      </ButtonFacebook>
      <a
        href="https://app.tryfeed.co/join/email"
        className={[
          'mt-2',
          'mb-0',
          'text-center',

          'xs:col-span-6',
          'xs:mt-0',
          'xs:text-left',

          'lg:col-span-2',
          'lg:pl-0',
        ].join(' ')}
      >
        or email.
      </a>
      <Error error={error} />
    </div>
  )
}
