import React from 'react'
import PropTypes from 'prop-types'

const SearchResultsList = ({
  query,
  searchResults,
  listItem,
  onClick,
  isLoading,
  hasFetchedData,
}) => {
  const ListItem = listItem

  if (hasFetchedData && query && searchResults.length === 0 && !isLoading) {
    return <p>No search results found.</p>
  }

  return (
    <ul className="mb-8">
      {searchResults.map((item, index) => (
        <ListItem
          key={index}
          item={item}
          onClick={onClick}
        />
      ))}
    </ul>
  )
}

SearchResultsList.propTypes = {
  query: PropTypes.array,
  searchResults: PropTypes.array.isRequired,
  listItem: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasFetchedData: PropTypes.bool.isRequired,
}

SearchResultsList.defaultProps = {
  query: '',
}

export default SearchResultsList
