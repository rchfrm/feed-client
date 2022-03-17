import React from 'react'
import PropTypes from 'prop-types'

import ArrowAltIcon from '@/icons/ArrowAltIcon'
import Spinner from '@/elements/Spinner'
import brandColors from '../../shared/constants/brandColors'

const GetStartedPostsSelectionButtonsMobile = ({ loadMore, isLoading, isLoadingMorePosts, handleNext }) => {
  return (
    <div
      className={[
        'fixed flex flex-row transform -translate-x-1/2',
        'rounded-full overflow-hidden',
        'border-2 border-solid border-black bg-white',
      ].join(' ')}
      style={{ bottom: '40px', left: '50%' }}
    >
      <button
        onClick={loadMore}
        className={[
          'w-30 p-2 bg-white border-r-2 border-solid border-black text-black',
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
      <button
        onClick={handleNext}
        className="flex justify-center p-2 w-30 bg-green text-white"
      >
        {isLoading ? (
          <Spinner width={20} fill={brandColors.white} />
        ) : (
          <>
            Save
            <ArrowAltIcon
              className="ml-3"
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
  handleNext: PropTypes.func.isRequired,
}

GetStartedPostsSelectionButtonsMobile.defaultProps = {
}

export default GetStartedPostsSelectionButtonsMobile
