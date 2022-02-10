import React from 'react'
import PropTypes from 'prop-types'

import PostsFilterLabel from '@/app/PostsFilterLabel'
import PostsFilterOptions from '@/app/PostsFilterOptions'
import PostsFilterClearButton from '@/app/PostsFilterClearButton'

import ArrowIcon from '@/icons/ArrowIcon'

const PostsFilter = ({ title, filterType, initialFilters, setFiltersState }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [filters, setFilters] = React.useState(initialFilters)

  const addFilter = (value) => {
    setFilters([...filters, value])
  }

  const removeFilter = (value) => {
    setFilters(filters.filter((option) => option !== value))
  }

  const resetFilters = () => {
    setFilters([])
  }

  const onClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={[
      'relative',
      isOpen ? 'mb-0' : 'mb-5',
    ].join(' ')}
    >
      <button
        onClick={onClick}
        className={[
          'relative z-10',
          'flex justify-between items-center',
          'w-full h-10',
          'px-2 xs:px-4 py-2',
          'bg-grey-2 rounded-button font-bold',
        ].join(' ')}
      >
        <PostsFilterLabel title={title} filters={filters} />
        <div className={[
          'transition-transform duration-100 transform origin-center',
          isOpen ? 'rotate-90' : null,
        ].join(' ')}
        >
          <ArrowIcon
            className="w-3 h-3"
            direction="right"
          />
        </div>
      </button>
      {filters.length > 0 && (
        <PostsFilterClearButton
          filterType={filterType}
          resetFilters={resetFilters}
          setFiltersState={setFiltersState}
        />
      )}
      <PostsFilterOptions
        filters={filters}
        filterType={filterType}
        addFilter={addFilter}
        removeFilter={removeFilter}
        setFiltersState={setFiltersState}
        isOpen={isOpen}
      />
    </div>
  )
}

PostsFilter.propTypes = {
  title: PropTypes.string.isRequired,
  filterType: PropTypes.object.isRequired,
  initialFilters: PropTypes.array.isRequired,
  setFiltersState: PropTypes.func.isRequired,
}

PostsFilter.defaultProps = {
}

export default PostsFilter
