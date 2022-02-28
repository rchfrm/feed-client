import React from 'react'
import Link from 'next/link'

import * as ROUTES from '@/app/constants/routes'

const ResultsSpendingPausedWarning = () => {
  return (
    <div className="px-4 py-2 rounded-dialogue border-solid border-red border-2 text-red">
      <span>Spending paused, </span>
      <Link href={ROUTES.CONTROLS}>
        <a className="no--hover">resume?</a>
      </Link>
    </div>
  )
}

ResultsSpendingPausedWarning.propTypes = {

}

export default ResultsSpendingPausedWarning
