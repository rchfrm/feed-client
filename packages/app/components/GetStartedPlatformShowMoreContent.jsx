import React from 'react'
import PropTypes from 'prop-types'

import GetStartedPlatformButton from '@/app/GetStartedPlatformButton'

const GetStartedPlatformShowMoreContent = ({
  platforms,
  setSelectedPlatform,
  shouldShowMore,
}) => {
  return (
    <div className="flex flex-wrap justify-center content-center">
      {shouldShowMore && (
        platforms.map((platform) => {
          return (
            <GetStartedPlatformButton
              key={platform.value}
              platform={platform}
              setSelectedPlatform={setSelectedPlatform}
            />
          )
        })
      )}
    </div>
  )
}

GetStartedPlatformShowMoreContent.propTypes = {
  platforms: PropTypes.array.isRequired,
  setSelectedPlatform: PropTypes.func.isRequired,
  shouldShowMore: PropTypes.bool.isRequired,
}

GetStartedPlatformShowMoreContent.defaultProps = {
}

export default GetStartedPlatformShowMoreContent
