import Link from 'next/link'
import * as ROUTES from '../constants/routes'

export default () => {
  return (
    <div className="ninety-wide">
      <h3>
        or log in
        {' '}
        <Link href={ROUTES.LOGIN}><a>here</a></Link>
        .
      </h3>
    </div>
  )
}
