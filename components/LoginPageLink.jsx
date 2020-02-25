import Link from 'next/link'
import * as ROUTES from '../constants/routes'

export default () => {
  return (
    <h3 className="ninety-wide">
      or log in
      {' '}
      <Link href={ROUTES.LOGIN}><a>here</a></Link>
      .
    </h3>
  )
}
