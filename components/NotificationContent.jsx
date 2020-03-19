import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import * as ROUTES from '../constants/routes'
import Feed from './elements/Feed'

const notificationContent = {
  'add-payment-details': {
    title: 'Please add a way to pay',
    message: (
      <div>
        <p>
          In order to keep using&nbsp;
          <Feed />
          &nbsp;
          after your trial ends, you'll need to enter some payment details.
        </p>
        <p>
          Once a month, you'll be charged a small % of what you spend on promotion - a 'service fee' of sorts.
          More detail on our pricing is available
          &nbsp;
          <Link href={ROUTES.PRICING}><a>here</a></Link>
          .
        </p>
        <p>Click the button below to get started, it won't take a minute.</p>
      </div>
    ),
    action: () => Router.push(ROUTES.PAYMENT),
    actionText: 'Enter payment details',
  },
}

export default notificationContent
