import React from 'react'
import Link from 'next/link'

import useControlsStore from '@/app/stores/controlsStore'


import * as ROUTES from '@/app/constants/routes'

const getControlsStoreState = (state) => ({
  isSpendingPaused: state.isSpendingPaused,
})

const ResultsSpendingPausedWarning = () => {
  const {
    isSpendingPaused,
  } = useControlsStore(getControlsStoreState)
  return (
    isSpendingPaused && (
      <div className="px-4 py-2 rounded-dialogue border-solid border-red border-2 text-red">
        <span>Spending paused, </span>
        <Link href={ROUTES.CONTROLS}>
          <a className="no--hover">resume?</a>
        </Link>
      </div>
    )
  )
}

ResultsSpendingPausedWarning.propTypes = {

}

export default ResultsSpendingPausedWarning
