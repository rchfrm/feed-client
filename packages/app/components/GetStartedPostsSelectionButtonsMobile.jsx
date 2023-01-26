import React from 'react'
import PropTypes from 'prop-types'

import ArrowIcon from '@/icons/ArrowIcon'
import Spinner from '@/elements/Spinner'
import brandColors from '@/constants/brandColors'

const GetStartedPostsSelectionButtonsMobile = ({
  loadMore,
  isLoading,
  isLoadingMorePosts,
  handleNext,
  shouldShowLoadMoreButton,
}) => {
  return (
    <div
      className={[
        'fixed flex flex-row -translate-x-1/2',
        'rounded-full overflow-hidden',
        'border-2 border-solid border-black bg-offwhite',
      ].join(' ')}
      style={{ bottom: '40px', left: '50%' }}
    >
      {shouldShowLoadMoreButton && (
        <button
          onClick={loadMore}
          className={[
            'w-30 p-2 bg-offwhite border-r-2 border-solid border-black text-black',
          ].join(' ')}
        >
          {isLoadingMorePosts ? (
            <Spinner width={20} fill={brandColors.black} />
          ) : (
            <>
              More ...
            </>
          )}
        </button>
      )}
      <button
        onClick={handleNext}
        className="flex justify-center p-2 w-30 bg-green text-offwhite"
      >
        {isLoading ? (
          <Spinner width={20} fill={brandColors.offwhite} />
        ) : (
          <>
            Save
            <ArrowIcon
              className="w-7 h-auto ml-3"
              direction="right"
              fill="white"
            />
          </>
        )}
      </button>
    </div>
  )
}

GetStartedPostsSelectionButtonsMobile.propTypes = {
  loadMore: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isLoadingMorePosts: PropTypes.bool.isRequired,
  handleNext: PropTypes.func.isRequired,
  shouldShowLoadMoreButton: PropTypes.bool.isRequired,
}

GetStartedPostsSelectionButtonsMobile.defaultProps = {
}

export default GetStartedPostsSelectionButtonsMobile
