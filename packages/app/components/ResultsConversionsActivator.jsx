import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'

import * as ROUTES from '@/app/constants/routes'

import MarkdownText from '@/elements/MarkdownText'
import copy from '@/app/copy/ResultsPageCopy'

import NoDataBlock from '@/app/NoDataBlock'

import JoystickIcon from '@/icons/JoystickIcon'

import brandColors from '@/constants/brandColors'

const ResultsConversionTeaser = ({ className }) => {
  const goToControlsConversionsPage = () => {
    Router.push({
      pathname: ROUTES.CONTROLS,
      query: { slug: 'conversions' },
    })
  }

  return (
    <div className={[
      className,
    ].join('')}
    >
      <p className="hidden sm:block font-bold text-xl text-left mr-auto sm:mr-0">Sales &amp; Sign-ups</p>
      <div className="hidden sm:block flex items-center sm:mb-5" style={{ minHeight: '88px' }}>
        <MarkdownText className="mb-0 mr-auto sm:mr-0 sm:text-center" markdown={copy.conversionsActivatorTitle} />
      </div>
      <button
        className="flex-1 w-full"
        onClick={goToControlsConversionsPage}
      >
        <NoDataBlock className="mb-4 sm:mb-0">
          <div
            className={[
              'flex justify-center items-center',
              'w-14 h-14 rounded-full mb-2',
            ].join(' ')}
            style={{ backgroundColor: brandColors.instagram.bg }}
          >
            <JoystickIcon className="w-5 h-auto" fill="white" />
          </div>
          <MarkdownText className="text-center px-8 mb-0" markdown={copy.conversionsActivatorDescription} />
        </NoDataBlock>
      </button>
    </div>
  )
}

ResultsConversionTeaser.propTypes = {
  className: PropTypes.string,
}

ResultsConversionTeaser.defaultProps = {
  className: null,
}

export default ResultsConversionTeaser
