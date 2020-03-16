import Link from 'next/link'
import * as ROUTES from '../constants/routes'


export default () => (
  <div className="ninety-wide">
    <h3>
      or
      {' '}
      <Link href={ROUTES.SIGN_UP}><a>sign up here</a></Link>
      .
    </h3>
  </div>
)
