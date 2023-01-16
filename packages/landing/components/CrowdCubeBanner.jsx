/* eslint-disable quotes */

import React from 'react'

import BannerBase from '@/landing/elements/BannerBase'
import CrowdCubeIcon from '@/landing/icons/CrowdCubeIcon'

const CrowdCubeBanner = () => {
  const copy = `**We're crowdfunding!** Own a part of Feed. Capital at Risk.`
  const link = 'https://crowdcube.com/feed/pitches/b6nePb?utm_source=website&utm_medium=website&utm_campaign=Feed:landing_page&utm_term=campaign_referral_link'
  return (
    <BannerBase
      innerClassName="sm:flex items-center justify-between px-5 xs:px-8"
      copy={copy}
      textLeft
      link={link}
    >
      <p className="mb-0 mt-5 sm:mt-0 flex justify-between items-center">
        <span
          className={[
            'inline-block',
            'border-2 border-solid border-offwhite rounded-full',
            'px-4 py-2',
            'mr-5',
          ].join(' ')}
          style={{
            paddingTop: '0.33rem',
            transform: 'translateY(0.1em)',
          }}
        >
          View our pitch
        </span>
        <CrowdCubeIcon className="h-10 w-auto hidden md:block" />
      </p>
    </BannerBase>
  )
}

export default CrowdCubeBanner
