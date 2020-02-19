import Link from 'next/link'
import * as ROUTES from '../constants/routes'

export default () => (
  <h3 className="ninety-wide">
    or
    {' '}
    <Link href={ROUTES.SIGN_UP}><a>sign up here</a></Link>
    .
  </h3>
)
