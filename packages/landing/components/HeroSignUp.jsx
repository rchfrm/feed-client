import React from 'react'
import Button from '@/elements/Button'
import Error from 'shared/components/elements/Error'
import { mixpanelExternalLinkClick, mixpanelInternalLinkClick } from '@/landing/helpers/mixpanelHelpers'
import useGlobalInfoStore from '@/landing/store/globalInfoStore'

const getJoinLink = state => state.joinLink

export default function HeroSignUp() {
  const joinLink = useGlobalInfoStore(getJoinLink)
  return (
    <div
      className={[
        'pb-8',
        'col-span-12',
        'row-start-2',
        'col-start-1',

        'xs:col-span-6',
        'xs:col-start-4',

        'md:col-start-1',
        'md:col-span-5',

        'lg:col-end-6',
        'lg:z-10',

        'bmw:col-end-5',
      ].join(' ')}
    >
      <Button
        onClick={() => {
          mixpanelExternalLinkClick(joinLink, { location: 'hero' })
        }}
        version="pink"
        className={[
          'w-full',
        ].join(' ')}
        fallbackCta="Sign up"
      >
        Get started
      </Button>
    </div>
  )
}
