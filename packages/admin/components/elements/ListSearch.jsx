import PropTypes from 'prop-types'
import React from 'react'

import debounce from 'lodash/debounce'

import FuzzySearch from 'fuzzy-search'

import Input from '@/elements/Input'

const ListSearch = ({
  fullList,
  updateList,
  searchBy,
  inputLabel,
  className,
}) => {
  const [inputValue, setInputValue] = React.useState('')
  const [searchTerm, setSearchTerm] = React.useState('')
  const updateSearch = debounce((value) => setSearchTerm(value), 300)
  const handleChange = React.useCallback(({ target: { value } }) => {
    setInputValue(value)
    updateSearch(value)
  // eslint-disable-next-line
  }, [setSearchTerm])

  const searcher = new FuzzySearch(fullList, searchBy, {
    caseSensitive: false,
    sort: true,
  })

  React.useEffect(() => {
    const searchResults = searcher.search(searchTerm)
    updateList(searchResults)
  // eslint-disable-next-line
  }, [fullList, searchTerm, updateList])

  return (
    <div className={[className].join(' ')}>
      <Input
        label={inputLabel}
        name="listSearch"
        value={inputValue}
        handleChange={handleChange}
      />
    </div>
  )
}

ListSearch.propTypes = {
  fullList: PropTypes.array,
  updateList: PropTypes.func.isRequired,
  searchBy: PropTypes.array,
  inputLabel: PropTypes.string,
  className: PropTypes.string,
}

ListSearch.defaultProps = {
  fullList: [],
  searchBy: ['name', 'id'],
  inputLabel: 'Search filtered items by name or ID',
  className: '',
}


export default ListSearch
