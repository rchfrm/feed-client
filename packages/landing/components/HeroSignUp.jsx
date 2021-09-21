import React from 'react'
import Button from '@/elements/Button'
import { mixpanelExternalLinkClick } from '@/landing/helpers/mixpanelHelpers'
import useGlobalInfoStore from '@/landing/store/globalInfoStore'
import * as styles from '@/landing/PrimaryCTA.module.css'
import brandColors from 'shared/constants/brandColors'
import ArrowAltIcon from 'shared/components/icons/ArrowAltIcon'

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
          'h-auto',
          'pt-2',
          'px-8',
          'pb-2',
          'text-insta',
          'text-3xl',
          'bg-white',
          'border-solid',
          'border-pink',
          'w-full',
          'hover:bg-white',
          'focus:bg-white',
          'focus:shadow-none',
          styles.ctaShadow,
        ].join(' ')}
        fallbackCta="Sign up"
      >
        Get started
        <ArrowAltIcon
          className="ml-3 h-6"
          fill={brandColors.instagram.bg}
          direction="right"
        />
      </Button>
    </div>
  )
}
