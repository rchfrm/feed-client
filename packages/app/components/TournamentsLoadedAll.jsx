import React from 'react'
import PropTypes from 'prop-types'

import Link from 'next/link'

import Button from '@/elements/Button'

import * as ROUTES from '@/app/constants/routes'

const TournamentsLoadedAll = ({ className }) => {
  return (
    <div
      className={[
        'mt-10 text-center',
        className,
      ].join(' ')}
    >
      <p>All tournaments loaded.</p>
      <div className="inline-block">
        <Link href={ROUTES.RESULTS}>
          <Button
            version="x-small green"
            wrapper="a"
          >
            Back to results
          </Button>
        </Link>
      </div>
    </div>
  )
}

TournamentsLoadedAll.propTypes = {
  className: PropTypes.string,
}

TournamentsLoadedAll.defaultProps = {
  className: null,
}

export default TournamentsLoadedAll
