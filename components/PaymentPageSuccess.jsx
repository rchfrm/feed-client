import Router from 'next/router'
import Link from 'next/link'
import moment from 'moment'
import * as ROUTES from '../constants/routes'
// IMPORT ELS
import Feed from './elements/Feed'
import Button from './elements/Button'
// IMPORT STYLES
import styles from './PaymentPage.module.css'

// PAYMENT SUCCESS
const PaymentPageSuccess = ({ cardDetails }) => {
  const handleClick = e => {
    e.preventDefault()
    Router.push(ROUTES.ACCOUNT)
  }

  return (
    <div className={`ninety-wide ${styles['payment-success']}`}>

      <div className={styles['payment-success-headers']}>

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
        version="black progress"
        onClick={handleClick}
      >
        Ok.
      </Button>
    </div>
  )
}

export default PaymentPageSuccess
