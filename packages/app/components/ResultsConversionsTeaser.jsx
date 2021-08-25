import React from 'react'
import PropTypes from 'prop-types'

import LightbulbIcon from '@/icons/LightbulbIcon'

import useShowConversionsInterest from '@/app/hooks/useShowConversionsInterest'

const ResultsConversionTeaser = ({ className }) => {
  const openConversionsInterestPanel = useShowConversionsInterest()

  return (
    <div className={[
      className,
    ].join('')}
    >
      <p className="font-bold text-xl text-left mr-auto sm:mr-0">Sales &amp; Sign-ups</p>
      <p className="mr-auto sm:mr-0 sm:text-center sm:mb-15">Coming soon!</p>
      <button
        className="w-full h-48 sm:h-full bg-grey-1 flex flex-col items-center justify-center"
        onClick={openConversionsInterestPanel}
      >
        <div
          className={[
            'flex justify-center items-center',
            'w-14 h-14 bg-yellow rounded-full mb-2',
          ].join(' ')}
        >
          <LightbulbIcon className="w-5 h-auto" />
        </div>
        <p className="text-center mb-0">Conversion ads<br />coming soon!</p>
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
