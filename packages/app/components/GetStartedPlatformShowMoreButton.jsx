import React from 'react'
import PropTypes from 'prop-types'

import ButtonNew from '@/elements/ButtonNew'
import CaretIcon from '@/icons/CaretIcon'

import brandColors from '@/constants/brandColors'

const GetStartedPlatformShowMoreButton = ({ shouldShowMore, setShouldShowMore }) => {
  const toggleShowMore = () => {
    setShouldShowMore(! shouldShowMore)
  }

  return (
    <div>
      <ButtonNew
        version="text"
        onClick={toggleShowMore}
        trackComponentName="GetStartedPlatform"
        className="mb-4 text-grey-dark text-sm font-bold no-underline"
      >
        {shouldShowMore ? 'Hide' : 'Show more'}
        <span className={[
          'inline-block',
          'transition-transform duration-100 transform origin-center',
          shouldShowMore ? 'rotate-90' : null,
        ].join(' ')}
        >
          <CaretIcon
            direction="right"
            fill={brandColors.greyDark}
          />
        </span>
      </ButtonNew>
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
