import React from 'react'
import PropTypes from 'prop-types'

import produce from 'immer'

const getSortedList = (list, sortBy) => {
  return produce(list, draftList => {
    draftList.sort((a, b) => {
      const aValue = a[sortBy]
      const bValue = b[sortBy]
      if (aValue < bValue) return -1
      if (aValue > bValue) return 1
      return 0
    })
  })
}

const ListSort = ({
  fullList,
  updateList,
  sortOptions,
  className,
}) => {
  const [sortBy, setSortBy] = React.useState(sortOptions[0])
  // RUN SORT AND UPDATE PARENT LIST
  React.useEffect(() => {
    const sortedList = getSortedList(fullList, sortBy)
    updateList(sortedList)
  }, [sortBy, updateList, fullList])

  return (
    <nav className={[className].join(' ')}>
      <ul className="flex">
        {/* Filter buttons */}
        {sortOptions.map((sortOption) => {
          const statusClass = sortBy === sortOption ? '-active' : ''
          const title = sortOption.split('_').join(' ')
          return (
            <li key={sortOption} className={['mr-5', statusClass].join(' ')}>
              <button
                className={['button--filter', 'capitalize', statusClass].join(' ')}
                onClick={() => setSortBy(sortOption)}
              >
                {title}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

ListSort.propTypes = {
  fullList: PropTypes.array,
  updateList: PropTypes.func.isRequired,
  sortOptions: PropTypes.array.isRequired,
  className: PropTypes.string,
}

ListSort.defaultProps = {
  fullList: [],
  className: '',
}


export default ListSort
