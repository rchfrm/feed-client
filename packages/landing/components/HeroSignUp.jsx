import React from 'react'
import Button from '@/elements/Button'
import Input from '@/elements/Input'
import Error from '@/elements/Error'
import ArrowIcon from 'shared/components/icons/ArrowIcon'
import * as firebaseHelpers from '@/helpers/firebaseHelpers'
import { mixpanelExternalLinkClick } from '@/landing/helpers/mixpanelHelpers'
import useGlobalInfoStore from '@/landing/store/globalInfoStore'

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

    if (! email) {
      mixpanelExternalLinkClick(joinLink, { location: trackLocation })
      return
    }

    const { signInMethods, error: fetchError } = await firebaseHelpers.dofetchSignInMethodsForEmail(email)

    if (fetchError) {
      setError(fetchError)
      return
    }

    if (! signInMethods.length) {
      mixpanelExternalLinkClick(joinLink, { queryParams: { email }, location: trackLocation })
      return
    }

    if (signInMethods.length === 1 && signInMethods[0] === 'password') {
      mixpanelExternalLinkClick(`${loginLink}/email`, { queryParams: { email }, location: trackLocation })
      return
    }

    if (signInMethods.length === 1 && signInMethods[0] === 'facebook.com') {
      mixpanelExternalLinkClick(`${loginLink}/facebook`, { location: trackLocation })
      return
    }

    if (['facebook.com', 'password'].every((signInMethod) => signInMethods.indexOf(signInMethod) > -1)) {
      mixpanelExternalLinkClick(loginLink, { location: trackLocation })
    }
  }

  return (
    <div
      className={[
        'sm:col-start-3',
        'sm:col-end-11',
        'lg:z-10',
      ].join(' ')}
    >
      <div
        className={[
          'flex',
          'flex-col',
          'xxs:flex-row',
          'gap-4',
          'items-end',
        ].join(' ')}
      >
        <Input
          version="box-small"
          handleChange={handleChange}
          value={email}
          name="email"
          placeholder="name@domain.com"
          className={[
            'flex-1',
            'mb-0',
            'w-full',
          ].join(' ')}
        />
        <Button
          size="medium"
          onClick={fetchSignInMethodsAndRedirect}
          fallbackCta="Sign up"
          className={['w-full', 'xxs:w-fit'].join(' ')}
          trackComponentName="HeroSignUp"
        >
          Start a campaign
          <ArrowIcon
            className="w-7 h-auto ml-1"
            direction="right"
          />
        </Button>
      </div>
      <Error error={error} className="absolute" />
    </div>
  )
}
