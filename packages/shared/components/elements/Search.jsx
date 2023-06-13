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
  searchResults,
  setSearchResults,
  listItem,
  placeholder,
  limit,
  params,
  className,
}) => {
  const [query, setQuery] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [hasFetchedData, setHasFetchedData] = React.useState(false)
  const [error, setError] = React.useState(null)

  const debouncedQuery = useDebounce(query, 300)

  const handleChange = (e) => {
    const { target: { value } } = e

    setError(null)
    setQuery(value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
  }

  useAsyncEffect(async () => {
    if (! debouncedQuery) {
      setSearchResults([])
      setHasFetchedData(false)

      return
    }

    setIsLoading(true)

    const { res, error } = await onChange(debouncedQuery, ...params)

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
  searchResults: PropTypes.array,
  setSearchResults: PropTypes.func,
  listItem: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  limit: PropTypes.number,
  params: PropTypes.array,
  className: PropTypes.string,
}

Search.defaultProps = {
  label: '',
  searchResults: [],
  setSearchResults: () => null,
  placeholder: '',
  limit: 5,
  params: [],
  className: '',
}

export default Search
