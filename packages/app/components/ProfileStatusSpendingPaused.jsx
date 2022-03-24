import React from 'react'
import Router from 'next/router'

import * as ROUTES from '@/app/constants/routes'

const ProfileStatusSpendingPaused = () => {
  const goToControlsBudgetPage = () => {
    Router.push({
      pathname: ROUTES.CONTROLS_BUDGET,
    })
  }

  return (
    <button
      onClick={goToControlsBudgetPage}
    >
      Spending is:
      <span
        className="mb-0 border-2 border-red border-solid rounded-full ml-1 py-2 px-3"
      >
        paused
      </span>
    </button>
  )
}

ProfileStatusSpendingPaused.propTypes = {
}

ProfileStatusSpendingPaused.defaultProps = {
}

export default ProfileStatusSpendingPaused
