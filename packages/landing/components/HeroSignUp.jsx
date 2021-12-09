import React from 'react'
import Button from '@/elements/Button'
import Input from '@/elements/Input'
import Error from '@/elements/Error'
import brandColors from 'shared/constants/brandColors'
import ArrowAltIcon from 'shared/components/icons/ArrowAltIcon'

import * as firebaseHelpers from '@/helpers/firebaseHelpers'
import { mixpanelExternalLinkClick } from '@/landing/helpers/mixpanelHelpers'
import useGlobalInfoStore from '@/landing/store/globalInfoStore'

import * as styles from '@/landing/Hero.module.css'

const getGlobalInfoStoreState = (state) => ({
  joinLink: state.joinLink,
  loginLink: state.loginLink,
})

export default function HeroSignUp() {
  const [email, setEmail] = React.useState('')
  const [error, setError] = React.useState(null)
  const { joinLink, loginLink } = useGlobalInfoStore(getGlobalInfoStoreState)
  const trackLocation = 'hero'

  const handleChange = (e) => {
    setError(null)
    setEmail(e.target.value)
  }

  const fetchSignInMethodsAndRedirect = async () => {
    setError(null)

    if (!email) {
      setError({ message: 'Please provide an email address' })
      return
    }

    const { signInMethods, error: fetchError } = await firebaseHelpers.dofetchSignInMethodsForEmail(email)

    if (fetchError) {
      setError(fetchError)
      return
    }

    if (!signInMethods.length) {
      mixpanelExternalLinkClick(joinLink, { email, location: trackLocation })
      return
    }

    if (signInMethods.length === 1 && signInMethods[0] === 'password') {
      mixpanelExternalLinkClick(loginLink, { email, location: trackLocation })
      return
    }

    if (signInMethods.length === 1 && signInMethods[0] === 'facebook.com') {
      mixpanelExternalLinkClick(loginLink, { email, location: trackLocation })
      return
    }

    if (['facebook.com', 'password'].every(signInMethod => signInMethods.indexOf(signInMethod) > -1)) {
      mixpanelExternalLinkClick(loginLink, { email, location: trackLocation })
    }
  }

  return (
    <div
      className={[
        'col-span-12',
        'row-start-2',
        'sm:col-start-3',
        'sm:col-end-11',
        'pb-8 xs:pb-16',
        'lg:z-10',
      ].join(' ')}
    >
      <div className="flex flex-column xs:flex-row xs:items-end mb-2">
        <Input
          handleChange={handleChange}
          value={email}
          label="Enter your email to get started"
          name="email"
          placeholder="name@domain.com"
          className={[styles.heroInputBox, 'flex-1 border-pink mb-3 xs:mr-4 xs:mb-0'].join(' ')}
        />
        <Button
          onClick={fetchSignInMethodsAndRedirect}
          version="pink"
          className={[
            'py-4',
            'px-8',
            'text-white',
            'bg-pink',
          ].join(' ')}
          fallbackCta="Sign up"
          trackComponentName="HeroSignUp"
        >
          Get started
          <ArrowAltIcon
            className="ml-3 h-6"
            fill={brandColors.white}
            direction="right"
          />
        </Button>
      </div>
      <Error error={error} className="absolute" />
    </div>
  )
}
