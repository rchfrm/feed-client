import React from 'react'
import Link from 'next/link'
import moment from 'moment'
import * as ROUTES from '@/constants/routes'

import { SidePanelContext } from '@/contexts/SidePanelContext'

// IMPORT ELS
import Feed from '@/elements/Feed'
import Button from '@/elements/Button'
// IMPORT STYLES
import styles from '@/PaymentPage.module.css'

// PAYMENT SUCCESS
const PaymentPageSuccess = ({ cardDetails }) => {
  // Get Side panel context
  const {
    toggleSidePanel,
  } = React.useContext(SidePanelContext)

  return (
    <div className={styles.PaymentPageSuccess}>

      <div className={styles.PaymentPageSuccess__headers}>
        <h4 className={styles.h4}>
          Thanks! You successfully saved your
          {' '}
          {cardDetails.brand.toUpperCase()}
          {' '}
          card ending
          {' '}
          {cardDetails.last4}
          , that expires in
          {moment(cardDetails.exp_month, 'M').format('MMMM')}
          {' '}
          {moment(cardDetails.exp_year, 'YY').format('YYYY')}
          , to your
          {' '}
          <Feed />
          &nbsp;account.
        </h4>
        <h4 className={styles.h4}>
          You can view, and update your payment details at any time from the
          {' '}
          <Link href={ROUTES.ACCOUNT}><a>account</a></Link>
          {' '}
          page.
        </h4>
      </div>

      <Button
        version="black"
        onClick={toggleSidePanel}
        className={styles.PaymentPageSuccess__button}
      >
        Ok.
      </Button>
    </div>
  )
}

export default PaymentPageSuccess
