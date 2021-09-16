import React from 'react'
import PropTypes from 'prop-types'

import NoDataBlock from '@/app/NoDataBlock'

import LightbulbIcon from '@/icons/LightbulbIcon'

import useShowConversionsInterest from '@/app/hooks/useShowConversionsInterest'

const ResultsConversionTeaser = ({ className }) => {
  const openConversionsInterestPanel = useShowConversionsInterest()

  return (
    <div className={[
      className,
    ].join('')}
    >
      <p className="hidden sm:block font-bold text-xl text-left mr-auto sm:mr-0">Sales &amp; Sign-ups</p>
      <div className="hidden sm:block flex items-center sm:mb-5" style={{ minHeight: '88px' }}>
        <p className="mr-auto sm:mr-0 mb-0 sm:text-center">Coming soon!</p>
      </div>
      <button
        className="w-full"
        onClick={openConversionsInterestPanel}
      >
        <NoDataBlock>
          <div
            className={[
              'flex justify-center items-center',
              'w-14 h-14 bg-yellow rounded-full mb-2',
            ].join(' ')}
          >
            <LightbulbIcon className="w-5 h-auto" />
          </div>
          <p className="text-center mb-0">Conversion ads<br />coming soon!</p>
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
