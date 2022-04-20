import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'

import useDebounce from '@/app/hooks/useDebounce'

import SearchResultsList from '@/elements/SearchResultsList'
import Input from '@/elements/Input'
import Spinner from '@/elements/Spinner'
import Error from '@/elements/Error'

const Search = ({
  name,
  label,
  onChange,
  onClick,
  listItem,
  placeholder,
  limit,
  className,
}) => {
  const [query, setQuery] = React.useState('')
  const [searchResults, setSearchResults] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [hasFetchedData, setHasFetchedData] = React.useState(false)
  const [error, setError] = React.useState(null)

  const debouncedQuery = useDebounce(query, 300)

  const handleChange = (e) => {
    const { target: { value } } = e

    setQuery(value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
  }

  useAsyncEffect(async () => {
    if (!debouncedQuery) {
      setSearchResults([])
      setHasFetchedData(false)

      return
    }

    setIsLoading(true)

    const { res, error } = await onChange(debouncedQuery)

    if (error) {
      setError(error)
      setIsLoading(false)
      return
    }

    setHasFetchedData(true)
    setSearchResults(res.slice(0, limit))
    setIsLoading(false)
  }, [debouncedQuery])

  return (
    <form onSubmit={onSubmit}>
      <Input
        name={name}
        label={label}
        value={query}
        placeholder={placeholder}
        handleChange={handleChange}
        className={className}
      />
      <Error error={error} />
      {(isLoading) ? (
        <Spinner width={22} />
      ) : (
        <SearchResultsList
          query={query}
          searchResults={searchResults}
          listItem={listItem}
          onClick={onClick}
          isLoading={isLoading}
          hasFetchedData={hasFetchedData}
        />
      )}
    </form>
  )
}

Search.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  listItem: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  limit: PropTypes.number,
  className: PropTypes.string,
}

Search.defaultProps = {
  label: '',
  placeholder: '',
  limit: 5,
  className: '',
}

export default Search
