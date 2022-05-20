import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'
import ArrowIcon from '@/icons/ArrowIcon'

import brandColors from '@/constants/brandColors'

const GetStartedPlatformShowMoreButton = ({ shouldShowMore, setShouldShowMore }) => {
  const toggleShowMore = () => {
    setShouldShowMore(!shouldShowMore)
  }

  return (
    <div>
      <Button
        version="text"
        onClick={toggleShowMore}
        trackComponentName="GetStartedPlatform"
        className="h-5 mb-4 text-grey-3 text-sm no-underline"
      >
        {shouldShowMore ? 'Hide' : 'Show more'}
        <span className={[
          'inline-block ml-1',
          'transition-transform duration-100 transform origin-center',
          shouldShowMore ? 'rotate-90' : null,
        ].join(' ')}
        >
          <ArrowIcon
            direction="right"
            className="w-2 h-2"
            fill={brandColors.greyDark}
          />
        </span>
      </Button>
    </div>
  )
}

GetStartedPlatformShowMoreButton.propTypes = {
  setShouldShowMore: PropTypes.func.isRequired,
  shouldShowMore: PropTypes.bool.isRequired,
}

GetStartedPlatformShowMoreButton.defaultProps = {
}

export default GetStartedPlatformShowMoreButton
