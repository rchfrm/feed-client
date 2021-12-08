import React from 'react'
import Button from '@/elements/Button'
import Input from '@/elements/Input'
import brandColors from 'shared/constants/brandColors'
import ArrowAltIcon from 'shared/components/icons/ArrowAltIcon'

import * as styles from '@/landing/Hero.module.css'

export default function HeroSignUp() {
  const [email, setEmail] = React.useState('')
  return (
    <div
      className={[
        'col-span-12',
        'row-start-2',
        'sm:col-start-3',
        'sm:col-end-10',
        'flex flex-column xs:flex-row xs:items-end',
        'pb-8 xs:pb-16',
        'lg:z-10',
      ].join(' ')}
    >
      <Input
        updateValue={setEmail}
        value={email}
        label="Enter your email to get started"
        name="email"
        placeholder="name@domain.com"
        className={[styles.heroInputBox, 'flex-1 border-pink mb-3 xs:mr-4 xs:mb-0'].join(' ')}
      />
      <Button
        onClick={() => {
          console.log('Call fetchSigninMethodsForEmail')
        }}
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
  )
}
