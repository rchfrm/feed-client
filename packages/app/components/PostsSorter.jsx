import React from 'react'
import PropTypes from 'prop-types'
import Select from '@/elements/Select'
import { sortTypes } from '@/app/helpers/postsHelpers'

const PostsSorter = ({
  sortBy,
  setSortBy,
}) => {
  const handleChange = ({ target }) => {
    setSortBy(target.value)
  }

  return (
    <div className="flex items-center">
      <p className="mr-2 mb-0 font-bold">Sort:</p>
      <Select
        options={sortTypes}
        selectedValue={sortBy}
        name="sort"
        handleChange={handleChange}
        version="small box"
        className="w-16 mb-0 bg-white"
      />
    </div>
  )
}

PostsSorter.propTypes = {
  sortBy: PropTypes.string.isRequired,
  setSortBy: PropTypes.func.isRequired,
}

PostsSorter.defaultProps = {
}

export default PostsSorter
