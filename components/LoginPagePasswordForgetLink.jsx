import Link from 'next/link'
import * as ROUTES from '../constants/routes'
import styles from './LoginPage.module.css'

export default () => {
  return (
    <p className={styles.forgotPasswordLink}>
      <Link href={ROUTES.PASSWORD_FORGET}><a>Forgot Password?</a></Link>
    </p>
  )
}
