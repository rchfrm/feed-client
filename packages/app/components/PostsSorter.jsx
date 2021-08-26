import React from 'react'
import PropTypes from 'prop-types'

import BaseFilters from '@/BaseFilters'

import brandColors from '@/constants/brandColors'

const PostsSorter = ({
  currentSortValue,
  setCurrentSortValue,
  defaultPostState,
  className,
}) => {
  // Options array for base filters
  const baseFiltersOptions = [
    {
      id: 'publish-date',
      slug: 'publish-date',
      title: 'Publish Date',
      color: brandColors.black,
      activeTextColor: 'white',
    },
    {
      id: 'score',
      slug: 'score',
      title: 'Score',
      color: brandColors.greyDark,
      activeTextColor: 'white',
    },
  ]

  return (
    <BaseFilters
      options={baseFiltersOptions}
      activeOptionId={currentSortValue}
      defaultOptionId={defaultPostState}
      setActiveOptionId={setCurrentSortValue}
      labelText="Sort"
      useSetQuery
      useSetLocalStorage
      useSlug
      tooltipSlides={[]}
      querySlug="sortBy"
      trackProps={{
        action: 'adjust_sort',
        page: 'posts',
      }}
      className={className}
    />
  )
}

PostsSorter.propTypes = {
  currentSortValue: PropTypes.string.isRequired,
  setCurrentSortValue: PropTypes.func.isRequired,
  defaultPostState: PropTypes.string.isRequired,
  className: PropTypes.string,
}

PostsSorter.defaultProps = {
  className: null,
}

export default PostsSorter
