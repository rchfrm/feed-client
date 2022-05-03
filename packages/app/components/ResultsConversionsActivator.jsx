import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'

import * as ROUTES from '@/app/constants/routes'

import MarkdownText from '@/elements/MarkdownText'
import copy from '@/app/copy/ResultsPageCopy'

import JoystickIcon from '@/icons/JoystickIcon'

import brandColors from '@/constants/brandColors'

const ResultsConversionsActivator = ({ className }) => {
  const goToControlsPage = () => {
    Router.push({
      pathname: ROUTES.CONTROLS_OBJECTIVE,
    })
  }

  return (
    <div className={[
      className,
    ].join('')}
    >
      <p className="hidden sm:block text-xl text-left mr-auto sm:mr-0">Step 3: <strong>Sales</strong></p>
      <div className="hidden sm:block flex items-center" style={{ minHeight: '88px' }}>
        <MarkdownText className="mb-0 mr-auto sm:mr-0 sm:text-center" markdown={copy.conversionsActivatorTitle} />
      </div>
      <button
        className="w-full"
        onClick={goToControlsPage}
      >
        <div className="flex flex-column items-center">
          <div
            className={[
              'flex justify-center items-center',
              'w-10 h-10 rounded-full mb-3',
            ].join(' ')}
            style={{ backgroundColor: brandColors.instagram.bg }}
          >
            <JoystickIcon className="w-4 h-auto" fill="white" />
          </div>
          <MarkdownText className="text-center px-8 mb-0" markdown={copy.conversionsActivatorDescription} />
        </div>
      </button>
    </div>
  )
}

ResultsConversionsActivator.propTypes = {
  className: PropTypes.string,
}

ResultsConversionsActivator.defaultProps = {
  className: null,
}

export default ResultsConversionsActivator
