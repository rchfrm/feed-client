import React from 'react'
import PropTypes from 'prop-types'
import { capitalise } from '@/helpers/utils'

const TargetingInterestsTabs = ({
  platform,
  setPlatform,
  setInterest,
}) => {
  const platforms = ['meta', 'tiktok']

  const handleClick = (platform) => {
    setPlatform(platform)
    setInterest(null)
  }

  return (
    <div className="flex mb-6 text-black">
      {platforms.map((platformName) => (
        <button
          key={platformName}
          className={[
            'w-32 text-sm p-2',
            platformName === platform ? 'border-solid border-green border-t-3 font-bold' : 'bg-gradient-to-t from-grey-light text-grey hover:text-grey-dark transition-colors duration-200',
          ].join(' ')}
          onClick={() => handleClick(platformName)}
        >
          {capitalise(platformName)}
        </button>
      ))}
    </div>
  )
}

TargetingInterestsTabs.propTypes = {
  platform: PropTypes.string.isRequired,
  setPlatform: PropTypes.func.isRequired,
  setInterest: PropTypes.func.isRequired,
}

export default TargetingInterestsTabs
