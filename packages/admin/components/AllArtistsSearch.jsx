import PropTypes from 'prop-types'
import React from 'react'

import debounce from 'lodash/debounce'

import FuzzySearch from 'fuzzy-search'

import Input from '@/elements/Input'

const AllArtistsSearch = ({ artists, setSearchedArtists, className }) => {
  const [inputValue, setInputValue] = React.useState('')
  const [searchTerm, setSearchTerm] = React.useState('')
  const updateSearch = debounce(value => setSearchTerm(value), 300)
  const handleChange = React.useCallback(({ target: { value } }) => {
    setInputValue(value)
    updateSearch(value)
  // eslint-disable-next-line
  }, [setSearchTerm])

  const searcher = new FuzzySearch(artists, ['name', 'id'], {
    caseSensitive: false,
    sort: true,
  })

  React.useEffect(() => {
    const searchResults = searcher.search(searchTerm)
    setSearchedArtists(searchResults)
  // eslint-disable-next-line
  }, [artists, searchTerm, setSearchedArtists])

  return (
    <div className={[className].join(' ')}>
      <Input
        label="Search filtered artists by name or ID"
        name="artistSearch"
        value={inputValue}
        handleChange={handleChange}
      />
    </div>
  )
}

AllArtistsSearch.propTypes = {
  artists: PropTypes.array.isRequired,
  setSearchedArtists: PropTypes.func.isRequired,
  className: PropTypes.string,
}

AllArtistsSearch.defaultProps = {
  className: '',
}


export default AllArtistsSearch
