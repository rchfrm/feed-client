import React from 'react'
import Router from 'next/router'

import * as ROUTES from '@/app/constants/routes'
import PauseIcon from '@/icons/PauseIcon'

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
      <span
        className={[
          'mb-0',
          'border-3',
          'border-red',
          'border-solid',
          'rounded-full',
          'inline-flex',
          'items-center',
          'ml-2',
          'py-2',
          'px-3',
        ].join(' ')}
      >
        <span className="pr-2"><PauseIcon /></span>
        Spending paused,&nbsp;<span className="underline">resume</span>?
      </span>
    </button>
  )
}

ProfileStatusSpendingPaused.propTypes = {
}

ProfileStatusSpendingPaused.defaultProps = {
}

export default ProfileStatusSpendingPaused
