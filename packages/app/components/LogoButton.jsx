import React from 'react'
import PropTypes from 'prop-types'
import Router, { useRouter } from 'next/router'
import FeedLogo from '@/icons/FeedLogo'
import * as ROUTES from '@/app/constants/routes'
import brandColors from '@/constants/brandColors'

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
      <FeedLogo
        id={id}
        hasWordmark={hasWordmark}
        wordmarkClassName={[
          'transition-opacity delay-300',
          hasWordmark ? 'opacity-1' : 'opacity-0',
        ].join(' ')}
      />
    </button>
  )
}

LogoButton.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  hasWordmark: PropTypes.bool,
}

LogoButton.defaultProps = {
  className: null,
  hasWordmark: false,
}

export default LogoButton
