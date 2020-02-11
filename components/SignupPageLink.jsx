import Link from 'next/link'
import * as ROUTES from '../constants/routes'

export default () => (
  <h3 className="ninety-wide">
    or sign up
    {' '}
    <Link href={ROUTES.SIGN_UP}><a>here</a></Link>
    .
  </h3>
)
