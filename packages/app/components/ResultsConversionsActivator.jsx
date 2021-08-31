import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'

import * as ROUTES from '@/app/constants/routes'

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
      <p className="font-bold text-xl text-left mr-auto sm:mr-0">Sales &amp; Sign-ups</p>
      <p className="mr-auto sm:mr-0 sm:text-center sm:mb-15">Use Feed to generate sales or sign-ups outside Facebook &amp; Instagram.</p>
      <button
        className="w-full h-48 sm:h-full"
        onClick={goToControlsConversionsPage}
      >
        <NoDataBlock>
          <div
            className={[
              'flex justify-center items-center',
              'w-14 h-14 rounded-full mb-2',
            ].join(' ')}
            style={{ backgroundColor: brandColors.instagram.bg }}
          >
            <JoystickIcon className="w-5 h-auto" fill="white" />
          </div>
          <p className="text-center px-8 mb-0">Get started with generating sales or sign-ups!</p>
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
