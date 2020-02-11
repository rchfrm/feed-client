import Link from 'next/link'
import * as ROUTES from '../constants/routes'

export default () => {
  return (
    <p>
      <Link href={ROUTES.PASSWORD_FORGET}><a>Forgot Password?</a></Link>
    </p>
  )
}
