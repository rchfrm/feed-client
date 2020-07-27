import PropTypes from 'prop-types'
import React from 'react'

import FuzzySearch from 'fuzzy-search'

import Input from '@/elements/Input'

const AllArtistsSearch = ({ artists, setSearchedArtists, className }) => {
  const [searchTerm, setSearchTerm] = React.useState('')
  const handleChange = React.useCallback(({ target: { value } }) => {
    setSearchTerm(value)
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
        value={searchTerm}
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
