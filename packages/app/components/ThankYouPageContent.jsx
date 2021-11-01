
// IMPORT PACKAGES
import React from 'react'
import Router from 'next/router'
// IMPORT ELEMENTS
import Button from '@/elements/Button'
import Feed from '@/elements/Feed'
// IMPORT CONSTANTS
import * as ROUTES from '@/app/constants/routes'

function ThankYouPageContent() {
  const goToHomePage = () => {
    Router.push(ROUTES.HOME)
  }

  return (
    <>
      <div className="fill-height" style={{ justifyContent: 'initial' }}>

        <p>
          Thanks so much for signing up to&nbsp;
          <Feed />
          .
        </p>

        <p>On the next screen, you'll see an overview of the information we've been able to find about you so far, as well as some recommendations on what to do next.</p>

        <p>Let's get started.</p>

      </div>

      <div className="flex justify-end">
        <Button version="black" onClick={goToHomePage} trackComponentName="ThankYouPageContent">done.</Button>
      </div>
    </>

  )
}

export default ThankYouPageContent
