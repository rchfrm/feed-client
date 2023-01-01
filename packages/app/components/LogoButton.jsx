import React from 'react'
import Router, { useRouter } from 'next/router'
import FeedLogo from '@/icons/FeedLogo'
import * as ROUTES from '@/app/constants/routes'

const LogoButton = ({ id, className, hasWordmark }) => {
  const { pathname } = useRouter()

  const goHome = () => {
    if (pathname === ROUTES.HOME) {
      return
    }

    Router.push(ROUTES.HOME)
  }

  return (
    <button
      onClick={goHome}
      title="home"
      className={[className, 'flex justify-center items-center'].join(' ')}
    >
      <FeedLogo id={id} hasWordmark={hasWordmark} />
    </button>
  )
}

export default LogoButton
